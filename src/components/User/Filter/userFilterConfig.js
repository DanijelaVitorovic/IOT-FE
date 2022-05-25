import {
  fieldsArrayTypes,
  formFieldTypes,
  searchOperators,
} from '../../../constants/globals';

export const config = (props) => {
  const { rolesForCombo } = props || {};
  const { EQUAL, GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL } = searchOperators;

  return {
    fields: [
      {
        key: 1,
        name: 'firstName',
        type: formFieldTypes.TEXT,
      },
      {
        key: 2,
        name: 'lastName',
        type: formFieldTypes.TEXT,
      },
      {
        key: 3,
        name: 'createdAtFrom',
        type: formFieldTypes.DATE,
      },
      {
        key: 4,
        name: 'createdAtTo',
        type: formFieldTypes.DATE,
      },
      {
        key: 5,
        name: 'roles',
        type: formFieldTypes.AUTOCOMPLETE,
        optionList: rolesForCombo || [],
        getOptionLabel: (role) => role.text || '',
      },
    ],
    sortOrder: { ascendingOrder: [], descendingOrder: ['createdAt'] },
    fieldsArray: [
      { field: 'firstName' },
      { field: 'lastName' },
      {
        field: 'roles.id',
        type: fieldsArrayTypes.OBJECT,
        operator: EQUAL.value,
      },
      {
        field: 'createdAtFrom',
        type: fieldsArrayTypes.DATE,
        operator: GREATER_THAN_OR_EQUAL.value,
      },
      {
        field: 'createdAtTo',
        type: fieldsArrayTypes.DATE,
        operator: LESS_THAN_OR_EQUAL.value,
      },
    ],
  };
};
