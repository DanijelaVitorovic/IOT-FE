import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withTranslations from '../../utils/HighOrderComponent';
import {
  fetchAllUsersPageble,
  createUser,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser,
  updateUserPassword,
  deactivate2fa,
  filterAllUsersPageable,
  deleteErrorUser,
  generateUsername,
  clearGeneratedUsername,
  generatePassword,
  clearGeneratedPassword,
} from '../../actions/user';
import {
  register2fa,
  confirm2fa,
  deleteErrorSecurity,
} from '../../actions/security';
import { fetchAllRolesHashMapList } from '../../actions/role';
import UserFilter from '../User/Filter/UserFilter';
import UserTable from '../User/UserTable';
import TablePaginationContainer from '../Reusable/Table/TablePaginationContainer';
import { numberOfItemsPerPage } from '../../constants/globals.js';
import { finalizeSearchData } from '../../utils/search';

const UserList = (props) => {
  const dispatch = useDispatch();
  const { roleReducer, userReducer } = useSelector((state) => ({
    roleReducer: state.roleReducer,
    userReducer: state.userReducer,
  }));
  const { t, gt } = props || {},
    { EnhancedTable, Filter } = gt || {},
    { NotificationMessages } = Filter || {},
    { UserTable: Table } = t || {},
    { NotificationMessages: TableNotificationMessages } = Table || {},
    {
      userList,
      error,
      totalElements,
      loading,
      generatedUsername,
      generatedPassword,
    } = userReducer || {},
    { rolesHashMapList } = roleReducer || {};

  const [postData, setPostData] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(numberOfItemsPerPage);

  useEffect(() => {
    dispatch(fetchAllRolesHashMapList(TableNotificationMessages));
  }, [dispatch, TableNotificationMessages]);

  const onSearchHandler = useCallback(
    function (searchData) {
      dispatch(
        filterAllUsersPageable(
          finalizeSearchData(searchData, activePage, pageSize),
          NotificationMessages
        )
      );
    },
    [activePage, pageSize, NotificationMessages, dispatch]
  );

  useEffect(() => {
    postData
      ? onSearchHandler(postData)
      : dispatch(fetchAllUsersPageble(activePage, pageSize));
  }, [activePage, pageSize, dispatch, onSearchHandler, postData]);

  const createUserHandler = (userForSave, callback, notificationMessages) => {
    setActivePage(0);
    dispatch(createUser(userForSave, callback, notificationMessages, pageSize));
  };

  const deleteUserHandler = (id, deleteRoleHandler) => {
    dispatch(deleteUser(id, deleteRoleHandler, activePage, pageSize));
  };

  return (
    <Fragment>
      <UserFilter
        translations={t.Filters}
        filterTranslations={Filter}
        setPostData={setPostData}
        roles={rolesHashMapList}
      />
      <UserTable
        userList={userList}
        rolesHashMapList={rolesHashMapList}
        deleteUserHandler={deleteUserHandler}
        updateUser={updateUser}
        updateUserPassword={updateUserPassword}
        deactivateUser={deactivateUser}
        activateUser={activateUser}
        createUserHandler={createUserHandler}
        register2fa={register2fa}
        confirm2fa={confirm2fa}
        deactivate2fa={deactivate2fa}
        deleteErrorUser={deleteErrorUser}
        deleteErrorSecurity={deleteErrorSecurity}
        generateUsername={generateUsername}
        generatePassword={generatePassword}
        clearGeneratedUsername={clearGeneratedUsername}
        clearGeneratedPassword={clearGeneratedPassword}
        dispatch={dispatch}
        error={error}
        gt={gt}
        t={t}
        page={activePage}
        rowsPerPage={pageSize}
        loading={loading}
        generatedUsername={generatedUsername}
        generatedPassword={generatedPassword}
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

export default withTranslations(UserList, 'UserPage');
