import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import AuthContext from '../../../store/auth_context.js';
import {
  errorMessageHandler,
  basicFormValidationHandler,
} from '../../../utils.js';
import { isEmpty } from 'lodash';
import ButtonSave from '../../Reusable/ButtonSave.js';
import InputField from '../../Reusable/InputField.js';
import withTranslations from '../../../utils/HighOrderComponent';
import { localStorageConstants } from '../../../constants/globals';
import ErrorLabel from '../../Reusable/ErrorLabel.js';

const PasswordChangeForm = (props) => {
  const { t, submitHandler } = props || {},
    { Errors, Placeholders } = t || {};
  const { error } = useContext(AuthContext);

  const [state, setState] = useState({
    oldPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });
  const [errors, setErrors] = useState({});

  const { oldPassword, newPassword, confirmNewPassword } = state;
  const regexDescription = localStorage.getItem(
    localStorageConstants.USER_ROLE_REGEX
  );

  const onChangeHandler = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const clientValidationHandler = () => {
    const errorsObject = basicFormValidationHandler(
      { oldPassword, newPassword, confirmNewPassword },
      Errors
    );
    if (
      confirmNewPassword &&
      newPassword &&
      newPassword !== confirmNewPassword
    ) {
      errorsObject['passwordAndConfirmPasswordMatch'] =
        Errors.passwordAndConfirmPasswordMatch;
    }
    setErrors(errorsObject);
    return !isEmpty(errorsObject);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clientValidationHandler()) return;
    const userPasswordChangingDTO = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };
    submitHandler(userPasswordChangingDTO);
  };

  const helperText = regexDescription !== 'null' ? regexDescription : '';

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      <Row>
        <Col md={12}>
          <InputField
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder={Placeholders.oldPassword}
            value={oldPassword}
            onChange={onChangeHandler}
            error={errorMessageHandler(error, errors)}
            errorsHandler={setErrors}
            required
          />
          <InputField
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder={Placeholders.newPassword}
            value={newPassword}
            onChange={onChangeHandler}
            error={errorMessageHandler(error, errors)}
            errorsHandler={setErrors}
            helperText={helperText}
            required
          />
          <InputField
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            placeholder={Placeholders.confirmNewPassword}
            value={confirmNewPassword}
            onChange={onChangeHandler}
            error={errorMessageHandler(error, errors)}
            errorsHandler={setErrors}
            required
          />
          <ErrorLabel error={errors['passwordAndConfirmPasswordMatch']} />
        </Col>
      </Row>
      <Row className="mt-4">
        <ButtonSave />
      </Row>
    </form>
  );
};

export default withTranslations(PasswordChangeForm, 'PasswordChangeForm');
