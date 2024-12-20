import React, { Fragment, useState, useContext } from 'react';
import CustomModal from '../Reusable/Modal/CustomModal';
import TableContainer from '../Reusable/Table/TableContainer';
import { tableConfig } from './fridgeTableConfig';
import { confirmDialog } from '../Reusable/ConfirmDialog';
import FridgeForm from './FridgeForm';
import FridgeFormForDetails from './FridgeFormForDetails';
import AuthContext from '../../store/auth_context';
import { userActions } from '../../constants/user-actions';

const FridgeTable = (props) => {
  const {
      fridgeList,
      fridge,
      error,
      createFridgeHandler,
      deleteFridgeHandler,
      updateFridge,
      fetchFridgeById,
      deleteErrorFridge,
      dispatch,
      t,
      gt,
      page,
      rowsPerPage,
      loading,
    } = props || {},
    { FridgeTable: FridgeTableTranslations, Modals, Form } = t || {},
    {
      tableTitle,
      HeaderColumns,
      Tooltips,
      ConfirmDialog,
      NotificationMessages,
    } = FridgeTableTranslations || {};
  const { allowedActions } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(false);
  const [fridgeItem, setFridgeItem] = useState(null);

  const modalForAddShowHandler = () => {
    setShowModal(true);
  };

  const modalForUpdateShowHandler = (item) => {
    setFridgeItem(item);
    setShowModal(true);
  };

  const modalForDetailsShowHandler = (item) => {
    setFridgeItem(item);
    setDetails(true);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
    setDetails(false);
    setFridgeItem(null);
    dispatch(deleteErrorFridge());
  };

  const fridgeDeleteHandler = (id) => {
    const action = () => {
      deleteFridgeHandler(id, NotificationMessages);
    };
    confirmDialog(ConfirmDialog.deleteMessage, action, '', gt);
  };

  const saveHandler = (fridgeForSave) => {
    fridgeItem
      ? dispatch(
          updateFridge(fridgeForSave, modalCloseHandler, NotificationMessages)
        )
      : createFridgeHandler(
          fridgeForSave,
          modalCloseHandler,
          NotificationMessages
        );
  };

  const isFridgeCreationAllowed = allowedActions.includes(
    userActions.FRIDGE_CREATE
  );
  const isFridgeUpdateAllowed = allowedActions.includes(
    userActions.FRIDGE_UPDATE
  );
  const isFridgeDeleteAllowed = allowedActions.includes(
    userActions.FRIDGE_DELETE
  );

  const tableConfiguration = tableConfig({
    editAction: (item) => modalForUpdateShowHandler(item),
    deleteAction: (item) => fridgeDeleteHandler(item?.id),
    detailsAction: (item) => modalForDetailsShowHandler(item),
    isFridgeUpdateAllowed: isFridgeUpdateAllowed,
    isFridgeDeleteAllowed: isFridgeDeleteAllowed,
  });

  const modalTitle = fridgeItem
    ? Modals.modalForUpdateTitle
    : Modals.modalForAddTitle;

  return (
    <Fragment>
      <TableContainer
        tableId="fridges"
        shouldRenderAdd={isFridgeCreationAllowed}
        addAction={modalForAddShowHandler}
        translations={{ tableTitle, Tooltips, HeaderColumns }}
        tableConfig={tableConfiguration}
        items={fridgeList}
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
          <FridgeForm
            saveHandler={saveHandler}
            translations={Form}
            error={error}
            fridgeForUpdate={fridgeItem}
          />
        </CustomModal>
      )}
      {details && (
        <CustomModal
          show={details}
          hideModal={modalCloseHandler}
          title={fridgeItem.name}
        >
          <FridgeFormForDetails
            fetchFridgeById={fetchFridgeById}
            dispatch={dispatch}
            translations={Form}
            error={error}
            fridgeForDetails={fridgeItem}
            fridgeFromReducer={fridge}
          />
        </CustomModal>
      )}
    </Fragment>
  );
};

export default FridgeTable;
