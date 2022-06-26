import React, { Fragment, useState, useContext } from 'react';
import CustomModal from '../Reusable/Modal/CustomModal';
import TableContainer from '../Reusable/Table/TableContainer';
import { tableConfig } from './userTableConfig';
import { confirmDialog } from '../Reusable/ConfirmDialog';
import UserFormContainer from './UserFormContainer';
import ModalForAuthentification2fa from '../Security/2fa/ModalForAuthentification2fa';
import AuthContext from '../../store/auth_context';
import { userActions } from '../../constants/user-actions';

const UserTable = (props) => {
  const {
      userList,
      rolesHashMapList,
      error,
      createUserHandler,
      updateUser,
      updateUserPassword,
      deleteUserHandler,
      activateUser,
      deactivateUser,
      deactivate2fa,
      register2fa,
      confirm2fa,
      deleteErrorUser,
      deleteErrorSecurity,
      generateUsername,
      clearGeneratedUsername,
      clearGeneratedPassword,
      dispatch,
      t,
      gt,
      page,
      rowsPerPage,
      loading,
      generatedUsername,
      generatePassword,
      generatedPassword,
    } = props || {},
    { UserTable: UserTableTranslation, Modals, Form } = t || {},
    {
      tableTitle,
      HeaderColumns,
      Tooltips,
      ConfirmDialog,
      NotificationMessages,
    } = UserTableTranslation || {};

  const { allowedActions } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [showModal2faRegistartion, setShowModal2faRegistartion] = useState(
    false
  );
  const [user, setUser] = useState(null);
  const [passwordChangeSignal, setPasswordChangeSignal] = useState(false);

  const modalForAddShowHandler = () => {
    setShowModal(true);
  };

  const modalForUpdateShowHandler = (item) => {
    setUser(item);
    setShowModal(true);
  };

  const modalForPasswordChangeShowHandler = (item) => {
    setPasswordChangeSignal(true);
    modalForUpdateShowHandler(item);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
    setUser(null);
    setPasswordChangeSignal(false);
    setShowModal2faRegistartion(false);
    dispatch(deleteErrorUser());
    dispatch(deleteErrorSecurity());
    dispatch(clearGeneratedUsername());
    dispatch(clearGeneratedPassword());
  };

  const confirmActionHandler = (
    id,
    userAction,
    confirmMessage,
    isDispatched = true
  ) => {
    const action = () => {
      isDispatched
        ? dispatch(userAction(id, NotificationMessages))
        : userAction(id, NotificationMessages);
    };
    confirmDialog(confirmMessage, action, '', gt);
  };

  const userActivation2faHandler = (item) => {
    setUser(item);
    setShowModal2faRegistartion(true);
  };

  const confirm2faHandler = (verifyCode, userId) => {
    dispatch(
      confirm2fa(verifyCode, userId, modalCloseHandler, NotificationMessages)
    );
  };

  const saveHandler = (userForSave) => {
    if (user) {
      if (passwordChangeSignal) {
        dispatch(
          updateUserPassword(
            userForSave,
            modalCloseHandler,
            NotificationMessages
          )
        );
      } else {
        dispatch(
          updateUser(userForSave, modalCloseHandler, NotificationMessages)
        );
      }
    } else {
      createUserHandler(userForSave, modalCloseHandler, NotificationMessages);
    }
  };

  const usernameGeneratorHandler = (firstName, lastName) => {
    dispatch(generateUsername(firstName, lastName, NotificationMessages));
  };

  const passwordGeneratorHandler = () => {
    dispatch(generatePassword(NotificationMessages));
  };

  const isActionUserUpdateAllowed = allowedActions.includes(
    userActions.USER_UPDATE
  );

  const isActionUserDeleteAllowed = allowedActions.includes(
    userActions.USER_DELETE
  );

  const tableConfiguration = tableConfig({
    editAction: (item) => modalForUpdateShowHandler(item),
    deleteAction: (item) =>
      confirmActionHandler(
        item?.id,
        deleteUserHandler,
        ConfirmDialog.deleteMessage,
        false
      ),
    editPasswordAction: (item) => modalForPasswordChangeShowHandler(item),
    setUserStatusActive: {
      action: (item) =>
        confirmActionHandler(
          item?.id,
          activateUser,
          ConfirmDialog.activateMessage
        ),
      tooltipTitle: Tooltips.activate,
    },
    setUserStatusDeactive: {
      action: (item) =>
        confirmActionHandler(
          item?.id,
          deactivateUser,
          ConfirmDialog.deactivateMessage
        ),
      tooltipTitle: Tooltips.deactivate,
    },
    isActiveOrPassive: (item) => item.active,
    setUserStatusDeactivate2fa: {
      action: (item) =>
        confirmActionHandler(
          item?.id,
          deactivate2fa,
          ConfirmDialog.deactivate2faMessage
        ),
      tooltipTitle: Tooltips.deactivate2fa,
    },
    edit2faRegistrationWhenStatusPassive: {
      action: (item) => userActivation2faHandler(item),
      tooltipTitle: Tooltips.activate2fa,
    },
    isActiveOrPassive2FA: (item) => item?.useGoogle2f,
    isActionUserUpdateAllowed: isActionUserUpdateAllowed,
    isActionUserDeleteAllowed: isActionUserDeleteAllowed,
  });

  let modalTitle = '';
  if (showModal2faRegistartion) {
    modalTitle = Modals.modalFor2faRegistartion;
  } else if (user) {
    modalTitle = passwordChangeSignal
      ? Modals.modalForUpdatePasswordTitle
      : Modals.modalForUpdateTitle;
  } else {
    modalTitle = Modals.modalForAddTitle;
  }

  const isUserCreationAllowed = allowedActions.includes(
    userActions.USER_CREATE
  );

  return (
    <Fragment>
      <TableContainer
        tableId="users"
        shouldRenderAdd={isUserCreationAllowed}
        addAction={modalForAddShowHandler}
        translations={{ tableTitle, Tooltips, HeaderColumns }}
        tableConfig={tableConfiguration}
        items={userList}
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
          <UserFormContainer
            saveHandler={saveHandler}
            translations={Form}
            error={error}
            userForUpdate={user}
            rolesHashMapList={rolesHashMapList}
            passwordChangeSignal={passwordChangeSignal}
            generatedUsername={generatedUsername}
            generatedPassword={generatedPassword}
            usernameGeneratorHandler={usernameGeneratorHandler}
            passwordGeneratorHandler={passwordGeneratorHandler}
          />
        </CustomModal>
      )}
      {showModal2faRegistartion && (
        <ModalForAuthentification2fa
          show={showModal2faRegistartion}
          hideModal={modalCloseHandler}
          title={modalTitle}
          user={user}
          register2fa={register2fa}
          submitHandler={confirm2faHandler}
          dispatch={dispatch}
        />
      )}
    </Fragment>
  );
};

export default UserTable;
