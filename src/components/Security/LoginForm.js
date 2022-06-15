import React, { useState, useContext } from 'react';
import { Row } from 'react-bootstrap';
import AuthContext from '../../store/auth_context.js';
import {
  errorMessageHandler,
  basicFormValidationHandler,
} from '../../utils.js';
import { isEmpty } from 'lodash';
import ButtonSave from '../Reusable/ButtonSave.js';
import InputField from '../Reusable/InputField.js';
import axios from 'axios';

const LoginForm = (props) => {
  const { translations, onLoginHandler } = props || {},
    { Errors, Placeholders, Buttons } = translations || {};
  const { error } = useContext(AuthContext);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});

  const onChangeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const clientValidationHandler = () => {
    const errorsObject = basicFormValidationHandler(
      { username, password },
      Errors
    );
    setErrors(errorsObject);
    return !isEmpty(errorsObject);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clientValidationHandler()) return;
    const loginRequest = {
      username,
      password,
    };
    onLoginHandler(loginRequest);
    let url = `http://172.20.222.249:5000/setup`;
    axios.get(url);
  };

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      <Row>
        <InputField
          id="username"
          name="username"
          placeholder={Placeholders.username}
          value={username}
          onChange={onChangeUsernameHandler}
          error={errorMessageHandler(error, errors)}
          errorsHandler={setErrors}
        />
      </Row>
      <Row>
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder={Placeholders.password}
          value={password}
          onChange={onChangePasswordHandler}
          error={errorMessageHandler(error, errors)}
          errorsHandler={setErrors}
        />
      </Row>
      <Row className="mt-4">
        <ButtonSave label={Buttons.submit} />
      </Row>
    </form>
  );
};

export default LoginForm;
