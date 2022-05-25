import React, { Fragment, useState } from 'react';
import CustomModal from '../Reusable/Modal/CustomModal';
import TableContainer from '../Reusable/Table/TableContainer';
import { tableConfig } from './roleTableConfig';
import { confirmDialog } from '../Reusable/ConfirmDialog';
import RoleForm from './RoleForm';

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

  const tableConfiguration = tableConfig({
    editAction: (item) => modalForUpdateShowHandler(item),
    deleteAction: (item) => roleDeleteHandler(item?.id),
  });

  const modalTitle = role
    ? Modals.modalForUpdateTitle
    : Modals.modalForAddTitle;

  return (
    <Fragment>
      <TableContainer
        tableId="roles"
        shouldRenderAdd={true}
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
