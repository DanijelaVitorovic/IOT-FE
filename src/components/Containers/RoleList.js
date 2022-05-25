import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRoleAndReturnRoleDTO,
  updateRole,
  deleteRole,
  fetchAllActions,
  deleteErrorRole,
  fetchAllRolesPageable,
} from '../../actions/role';
import RoleTable from '../Role/RoleTable';
import withTranslations from '../../utils/HighOrderComponent';
import { numberOfItemsPerPage } from '../../constants/globals.js';
import TablePaginationContainer from '../Reusable/Table/TablePaginationContainer';

const RoleList = (props) => {
  const dispatch = useDispatch();
  const { roleDTOList, error, totalElements, actionList, loading } =
    useSelector((state) => state.roleReducer);
  const { t, gt } = props || {},
    { EnhancedTable } = gt || {};

  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(numberOfItemsPerPage);

  useEffect(() => {
    dispatch(fetchAllActions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllRolesPageable(activePage, pageSize));
  }, [activePage, pageSize, dispatch]);

  const createRoleHandler = (roleForSave, callback, notificationMessages) => {
    setActivePage(0);
    dispatch(
      createRoleAndReturnRoleDTO(
        roleForSave,
        callback,
        notificationMessages,
        pageSize
      )
    );
  };

  const deleteRoleHandler = (id, notificationMessages) => {
    dispatch(deleteRole(id, notificationMessages, activePage, pageSize));
  };

  return (
    <Fragment>
      <RoleTable
        roleList={roleDTOList}
        createRoleHandler={createRoleHandler}
        deleteRoleHandler={deleteRoleHandler}
        updateRole={updateRole}
        deleteErrorRole={deleteErrorRole}
        dispatch={dispatch}
        actionList={actionList}
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

export default withTranslations(RoleList, 'RolePage');
