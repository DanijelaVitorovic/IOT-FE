import React, { Fragment, useState, useContext } from 'react';
import CustomModal from '../Reusable/Modal/CustomModal';
import TableContainer from '../Reusable/Table/TableContainer';
import { tableConfig } from './roleTableConfig';
import { confirmDialog } from '../Reusable/ConfirmDialog';
import RoleForm from './RoleForm';
import AuthContext from '../../store/auth_context';
import { userActions } from '../../constants/user-actions';

const RoleTable = (props) => {
  const {
      roleList,
      error,
      actionList,
      createRoleHandler,
      deleteRoleHandler,
      updateRole,
      deleteErrorRole,
      dispatch,
      t,
      gt,
      page,
      rowsPerPage,
      loading,
    } = props || {},
    { RoleTable: RoleTableTranslations, Modals, Form } = t || {},
    {
      tableTitle,
      HeaderColumns,
      Tooltips,
      ConfirmDialog,
      NotificationMessages,
    } = RoleTableTranslations || {};
  const { allowedActions } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState(null);

  const modalForAddShowHandler = () => {
    setShowModal(true);
  };

  const modalForUpdateShowHandler = (item) => {
    setRole(item);
    setShowModal(true);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
    setRole(null);
    dispatch(deleteErrorRole());
  };

  const roleDeleteHandler = (id) => {
    const action = () => {
      deleteRoleHandler(id, NotificationMessages);
    };
    confirmDialog(ConfirmDialog.deleteMessage, action, '', gt);
  };

  const saveHandler = (roleForSave) => {
    role
      ? dispatch(
          updateRole(roleForSave, modalCloseHandler, NotificationMessages)
        )
      : createRoleHandler(roleForSave, modalCloseHandler, NotificationMessages);
  };

  const isRoleCreationAllowed = allowedActions.includes(
    userActions.ROLE_CREATE
  );
  const isRoleUpdateAllowed = allowedActions.includes(userActions.ROLE_UPDATE);
  const isRoleDeleteAllowed = allowedActions.includes(userActions.ROLE_DELETE);

  const tableConfiguration = tableConfig({
    editAction: (item) => modalForUpdateShowHandler(item),
    deleteAction: (item) => roleDeleteHandler(item?.id),
    isRoleUpdateAllowed: isRoleUpdateAllowed,
    isRoleDeleteAllowed: isRoleDeleteAllowed,
  });

  const modalTitle = role
    ? Modals.modalForUpdateTitle
    : Modals.modalForAddTitle;

  return (
    <Fragment>
      <TableContainer
        tableId="roles"
        shouldRenderAdd={isRoleCreationAllowed}
        addAction={modalForAddShowHandler}
        translations={{ tableTitle, Tooltips, HeaderColumns }}
        tableConfig={tableConfiguration}
        items={roleList}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
      />
      {showModal && (
        <CustomModal
          show={showModal}
          hideModal={modalCloseHandler}
          title={modalTitle}
        >
          <RoleForm
            saveHandler={saveHandler}
            translations={Form}
            error={error}
            roleForUpdate={role}
            actionList={actionList}
          />
        </CustomModal>
      )}
    </Fragment>
  );
};

export default RoleTable;
