import React, { useEffect, useState, useMemo, useCallback } from 'react';
import withTranslations from '../../utils/HighOrderComponent';
import styles from '../../styles/css/Search.module.css';
import { columnTypes } from '../../constants/globals';

const SearchFilter = (props) => {
  const {
      items,
      setData,
      columns,
      t,
      tableId,
      isFilterBasicList,
      setList,
      list,
    } = props || {},
    { Placeholders } = t || {};
  const [typedText, setTypedText] = useState(null);

  const searchColumns = useMemo(() => {
    return (
      columns?.filter(
        (column) =>
          column?.type === columnTypes.value ||
          column?.type === columnTypes.subobject
      ) || []
    );
  }, [columns]);

  const onKeyUpHandler = (e) => {
    const value = e.target.value;
    if (e.target.value?.length < 1) {
      setData(null);
    }
    setTypedText(value.toUpperCase());
  };

  const filterTable = useCallback(
    (tragetValue) => {
      const filteredItems =
        items?.filter((item) => {
          let isValuePresent = false;
          searchColumns?.forEach((column) => {
            if (item[column.key]) {
              let itemValue = setItemValue(item, column);
              if (itemValue?.includes(tragetValue)) isValuePresent = true;
              return isValuePresent;
            }
          });
          return isValuePresent ? item : null;
        }) || [];
      setData && setData(filteredItems);
    },
    [searchColumns, items, setData]
  );

  function setItemValue(item, column) {
    const key = column.key;
    switch (column.type) {
      case columnTypes.subobject:
        let subobjectValues = '';
        const subobjectData = column.subobjectData;
        for (let i = 0; i < subobjectData.length; i++) {
          let entity = item[key];
          if (Array.isArray(subobjectData[i]) && subobjectData[i].length > 1) {
            subobjectData[i].forEach((d) => (entity = entity?.[d]));
            entity && (subobjectValues = subobjectValues.concat(entity + ' '));
          } else {
            if (item[key]?.[subobjectData[i]]) {
              subobjectValues =
                subobjectValues.concat(item[key]?.[subobjectData[i]]) + ' ';
            }
          }
        }
        return subobjectValues?.toUpperCase() || '';
      case columnTypes.value:
        return item[key]?.toString()?.toUpperCase() || '';
      default:
        return '';
    }
  }

  useEffect(() => {
    const typingTimeout =
      typedText &&
      setTimeout(() => {
        filterTable(typedText);
      }, 900);
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [typedText, filterTable]);

  const requestSearchList = (searchedVal) => {
    const filteredItems = list.filter((item) => {
      return item.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setList(filteredItems);
  };

  const onKeyUpFunc = isFilterBasicList
    ? (e) => requestSearchList(e.target.value)
    : onKeyUpHandler;

  const filterStyle = isFilterBasicList
    ? styles['search-filter-transfer-list']
    : styles['search-filter'];

  return (
    <div className="row text">
      <div className={`${filterStyle} col-md-12`}>
        <span className={`${styles['search-icon']} align-self-center p-2`}>
          <img
            src="/images/searchIcon.png"
            className={styles['search-img']}
            alt="Search icon"
          />
        </span>
        <input
          type="text"
          className={`${styles['search-placeholder']} col-12 p-2`}
          id={tableId ? `searchInput_${tableId}` : 'searchInput'}
          onKeyUp={onKeyUpFunc}
          placeholder={Placeholders.fieldText}
        />
      </div>
    </div>
  );
};

export default withTranslations(SearchFilter, 'SearchFilter');
