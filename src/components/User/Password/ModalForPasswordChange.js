import React from 'react';
import CustomModal from '../../Reusable/Modal/CustomModal';
import PasswordChangeForm from './PasswordChangeForm';

const ModalForPasswordChange = (props) => {
  const { show, hideModal, title, submitHandler } = props || {};

  return (
    <CustomModal show={show} hideModal={hideModal} title={title} modalSize="md">
      <PasswordChangeForm submitHandler={submitHandler} />
    </CustomModal>
  );
};

export default ModalForPasswordChange;
