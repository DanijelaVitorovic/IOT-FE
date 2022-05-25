import {
  formatDateToStartOfTheDay,
  substringFromTargetText,
  substringToTargetText,
} from '../utils';
import { fieldsArrayTypes, searchOperators } from '../constants/globals';
import { isValid } from 'date-fns';

export const finalizeSearchData = (searchData, activePage, pageSize) => {
  return {
    ...searchData,
    pageNumber: activePage,
    pageSize,
  };
};

export const entryArrayFilterHandler = (
  entryArray,
  fieldsArray,
  isForJoinColumnProp = false
) => {
  return entryArray?.filter(
    (entry) =>
      entry[1] &&
      fieldsArray?.find(
        (field) =>
          ((isForJoinColumnProp && field.type === fieldsArrayTypes.OBJECT) ||
            (!isForJoinColumnProp && field.type !== fieldsArrayTypes.OBJECT)) &&
          field.field.includes(entry[0])
      )
  );
};

export const packSearchCriteria = (entry, fieldsArray) => {
  const object = fieldsArray.find((a) => a.field === entry[0]);
  if (object) {
    const operator = object.operator || searchOperators.LIKE.value;
    const objectField = object?.realColName || object.field;
    switch (object.type) {
      case fieldsArrayTypes.DATE:
        return setDateCriteria(objectField, entry[1], operator);
      case fieldsArrayTypes.OBJECT:
        return setObjectCriteria(objectField, entry[1], operator);
      case fieldsArrayTypes.ENUM:
        return setEnumCriteria(objectField, entry[1], operator);
      default:
        return {
          property: entry[0],
          value: entry[1],
          operator,
        };
    }
  } else {
    return [];
  }
};

function setDateCriteria(objectField, value, operator) {
  const dateColumnName = getDateColumnName(objectField);
  return (
    isValid(value) && {
      property: dateColumnName,
      value: formatDateToStartOfTheDay(value),
      operator,
    }
  );
}

function setObjectCriteria(objectField, value, operator) {
  const referenceColumn = substringToTargetText(objectField, '.');
  const referenceProp = substringFromTargetText(objectField, '.');
  return (
    value && {
      joinColumnName: referenceColumn,
      searchFilter: {
        property: referenceProp,
        value,
        operator,
      },
    }
  );
}

function setEnumCriteria(objectField, value, operator) {
  const propertyName = substringToTargetText(objectField, '.');
  return {
    property: propertyName,
    value,
    operator,
  };
}

function getDateColumnName(objectField) {
  let dateColumnName = objectField;
  if (objectField.endsWith('From')) {
    dateColumnName = substringToTargetText(objectField, 'From');
  }
  if (objectField.endsWith('To')) {
    dateColumnName = substringToTargetText(objectField, 'To');
  }
  return dateColumnName;
}
