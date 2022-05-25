import React, { useState, useContext } from 'react';
import {
  basicFormValidationHandler,
  errorMessageHandler,
} from '../../../utils';
import { isEmpty } from 'lodash';
import withTranslations from '../../../utils/HighOrderComponent';
import InputField from '../../Reusable/InputField';
import ButtonSave from '../../Reusable/ButtonSave';
import { Col, Row } from 'react-bootstrap';
import AuthContext from '../../../store/auth_context';

const Authentication2faForm = (props) => {
  const { t, user, submitHandler } = props || {},
    { Placeholders, Errors } = t || {};
  const { qrCode, error, loggedUser } = useContext(AuthContext);

  const [verifyCode, setVerifyCode] = useState('');
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    setVerifyCode(event.target.value);
  };

  const clientValidationHandler = () => {
    const errorsObject = basicFormValidationHandler({ verifyCode }, Errors);
    setErrors(errorsObject);
    return !isEmpty(errorsObject);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clientValidationHandler()) return;
    submitHandler(verifyCode, user?.id || loggedUser?.id);
  };

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      {user && (
        <Row>
          <img src={qrCode} className="qrCode-img m-auto" alt="QR code" />
        </Row>
      )}
      <Row className="mt-2">
        <Col md={10} className={'m-auto'}>
          <InputField
            id="verifyCode"
            name="verifyCode"
            placeholder={Placeholders.verifyCode}
            value={verifyCode}
            onChange={onChangeHandler}
            error={errorMessageHandler(error, errors)}
            errorsHandler={setErrors}
            required
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <ButtonSave />
      </Row>
    </form>
  );
};

export default withTranslations(Authentication2faForm, 'Authentication2faForm');
