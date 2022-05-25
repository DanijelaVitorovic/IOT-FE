import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createFridge,
  updateFridge,
  deleteFridge,
  fetchAllFridgesPageble,
  deleteErrorFridge,
  fetchFridgeById,
} from '../../actions/fridge';
import FridgeTable from '../Fridge/FridgeTable';
import withTranslations from '../../utils/HighOrderComponent';
import { numberOfItemsPerPage } from '../../constants/globals.js';
import TablePaginationContainer from '../Reusable/Table/TablePaginationContainer';

const FridgeList = (props) => {
  const dispatch = useDispatch();
  const { fridgeList, fridge, error, totalElements, loading } = useSelector(
    (state) => state.fridgeReducer
  );
  const { t, gt } = props || {},
    { EnhancedTable } = gt || {};

  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(numberOfItemsPerPage);

  useEffect(() => {
    dispatch(fetchAllFridgesPageble(activePage, pageSize));
  }, [activePage, pageSize, dispatch]);

  const createFridgeHandler = (
    fridgeForSave,
    callback,
    notificationMessages
  ) => {
    setActivePage(0);
    dispatch(
      createFridge(fridgeForSave, callback, notificationMessages, pageSize)
    );
  };

  const deleteFridgeHandler = (id, notificationMessages) => {
    dispatch(deleteFridge(id, notificationMessages, activePage, pageSize));
  };

  return (
    <Fragment>
      <FridgeTable
        fridgeList={fridgeList}
        fridge={fridge}
        createFridgeHandler={createFridgeHandler}
        deleteFridgeHandler={deleteFridgeHandler}
        updateFridge={updateFridge}
        fetchFridgeById={fetchFridgeById}
        deleteErrorFridge={deleteErrorFridge}
        dispatch={dispatch}
        error={error}
        t={t}
        gt={gt}
        page={activePage}
        rowsPerPage={pageSize}
        loading={loading}
      />
      <TablePaginationContainer
        totalElements={totalElements}
        activePage={activePage}
        pageSize={pageSize}
        setActivePage={setActivePage}
        setPageSize={setPageSize}
        translations={EnhancedTable}
      />
    </Fragment>
  );
};

export default withTranslations(FridgeList, 'FridgePage');
