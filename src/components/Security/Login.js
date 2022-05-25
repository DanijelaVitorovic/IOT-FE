import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  verify2fa,
  deleteErrorSecurity,
  passwordChange,
} from '../../actions/security';
import { deleteErrorUser } from '../../actions/user';
import withTranslations from '../../utils/HighOrderComponent';
import LoginForm from './LoginForm';
import ModalForAuthentification2fa from '../Security/2fa/ModalForAuthentification2fa';
import LoginFormWrapper from './LoginFormWrapper';
import ModalForPasswordChange from '../User/Password/ModalForPasswordChange';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loggedUserReducer } = useSelector((state) => state.loggedUserReducer);
  const { loading } = loggedUserReducer || {};
  const { t, gt } = props || {},
    { Modals, Form, NotificationMessages } = t || {};

  const [showModal2faVerification, setShowModal2faVerification] =
    useState(false);
  const [showModalPasswordChange, setShowModalPasswordChange] = useState(false);

  useEffect(() => {
    dispatch(logout(history));
    return () => {
      dispatch(deleteErrorUser());
      dispatch(deleteErrorSecurity());
    };
  }, [dispatch, history]);

  const modalShowHandler = () => {
    setShowModal2faVerification(true);
  };

  const modalUserChangePasswordShowHandler = () => {
    setShowModalPasswordChange(true);
  };

  const modalCloseHandler = () => {
    setShowModal2faVerification(false);
    setShowModalPasswordChange(false);
    dispatch(logout(history));
  };

  const modalUserPasswordChangeCloseHandler = () => {
    setShowModalPasswordChange(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  const onLoginHandler = (loginRequest) => {
    dispatch(
      login(
        loginRequest,
        modalShowHandler,
        modalUserChangePasswordShowHandler,
        NotificationMessages,
        history
      )
    );
  };

  const onVerification2faSubmitHandler = (verificationCode, verifierId) => {
    dispatch(
      verify2fa(verificationCode, verifierId, NotificationMessages, history)
    );
  };

  const onPasswordChangeSubmitHandler = (userPasswordChangingDTO) => {
    dispatch(
      passwordChange(
        userPasswordChangingDTO,
        modalUserPasswordChangeCloseHandler,
        NotificationMessages
      )
    );
  };

  return (
    <Fragment>
      <LoginFormWrapper title={t.title} appName={gt.appName} loading={loading}>
        <LoginForm translations={Form} onLoginHandler={onLoginHandler} />
      </LoginFormWrapper>
      {showModal2faVerification && (
        <ModalForAuthentification2fa
          show={showModal2faVerification}
          hideModal={modalCloseHandler}
          title={Modals.title}
          submitHandler={onVerification2faSubmitHandler}
        />
      )}
      {showModalPasswordChange && (
        <ModalForPasswordChange
          show={showModalPasswordChange}
          hideModal={modalUserPasswordChangeCloseHandler}
          title={Modals.ModalForPasswordChangeTitle}
          submitHandler={onPasswordChangeSubmitHandler}
        />
      )}
    </Fragment>
  );
};

export default withTranslations(Login, 'Login');
