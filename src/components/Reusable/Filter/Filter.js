import React, { useState } from 'react';
import dot from 'dot-object';
import {
  entryArrayFilterHandler,
  packSearchCriteria,
} from '../../../utils/search';
import Form from '../../Reusable/Form/Form';
import FilterCard from './FilterCard';
import '../../../styles/scss/app/Filter.scss';

const Filter = (props) => {
  const {
      tableName,
      savePostData,
      config,
      translations,
      packedTranslations,
      className,
      initFilterValues = null,
    } = props || {},
    { fields, sortOrder, fieldsArray } = config || {};

  const [filters, setFilters] = useState(initFilterValues);
  const [activeKey, setActiveKey] = useState('-1');

  const onToggleHandler = () => {
    const newValue = activeKey !== '0' ? '0' : '-1';
    setActiveKey(newValue);
  };

  const decoratedOnClickHandler = () => {
    setActiveKey('-1');
  };

  const onSubmitHandler = (values) => {
    setFilters(values);
    const dotNotationValuesObj = dot.dot(values);
    const entryArray = Object.entries(dotNotationValuesObj);
    const entryArrayForSearchFilter = entryArrayFilterHandler(
      entryArray,
      fieldsArray
    );
    const entryArrayForJoinColumnProps = entryArrayFilterHandler(
      entryArray,
      fieldsArray,
      true
    );

    const searchQuery = {
      className: tableName,
      sortOrder,
      searchFilter: entryArrayForSearchFilter
        .map((entry) => {
          return packSearchCriteria(entry, fieldsArray);
        })
        .filter((item) => !!item),
      joinColumnProps: entryArrayForJoinColumnProps
        .map((entry) => {
          return packSearchCriteria(entry, fieldsArray);
        })
        .filter((item) => !!item),
    };
    if (
      searchQuery.searchFilter?.length === 0 &&
      searchQuery.joinColumnProps?.length === 0
    ) {
      onResetHandler();
    } else {
      savePostData(searchQuery);
    }
  };

  const packConfig = () => {
    return {
      fields,
    };
  };

  function onResetHandler() {
    savePostData(null);
    setFilters(initFilterValues);
  }

  const showResetButton = activeKey === '0' && filters !== initFilterValues;

  return (
    <FilterCard
      translations={translations}
      activeKey={activeKey}
      showResetButton={showResetButton}
      onReset={onResetHandler}
      onToggle={onToggleHandler}
    >
      <Form
        className={`${className || 'Form'}`}
        onSubmit={onSubmitHandler}
        initialValues={filters}
        formConfig={packConfig()}
        translations={packedTranslations}
        removeCancel={true}
        submitLabel={translations.submit}
        decoratedOnClick={decoratedOnClickHandler}
      />
    </FilterCard>
  );
};

export default Filter;
