import React, { useEffect } from 'react';
import CustomModal from '../../Reusable/Modal/CustomModal';
import Authentication2faForm from './Authentication2faForm';

const ModalForAuthentification2fa = (props) => {
  const { show, hideModal, title, user, register2fa, submitHandler, dispatch } =
    props || {};

  useEffect(() => {
    user && register2fa && dispatch(register2fa(user?.id));
  }, [user, register2fa, dispatch]);

  return (
    <CustomModal show={show} hideModal={hideModal} title={title}>
      <Authentication2faForm user={user} submitHandler={submitHandler} />
    </CustomModal>
  );
};

export default ModalForAuthentification2fa;
