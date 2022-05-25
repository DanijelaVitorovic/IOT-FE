import React, { Fragment } from 'react';
import InputField from '../Reusable/InputField';
import ButtonSave from '../Reusable/ButtonSave';
import TransferList from '../Reusable/TransferList';
import { Row, Col } from 'react-bootstrap';
import ErrorLabel from '../Reusable/ErrorLabel';

const UserAlternateForm = ({
  translations,
  state,
  errors,
  error,
  rolesHashMapList,
  rolesInitiallySelected,
  onChangeHandler,
  onRolesChangeHandler,
  onSubmitHandler,
  errorMessageHandler,
  isUserUpdateForm,
  passwordChangeSignal,
  setErrors,
}) => {
  const { Placeholders, TransferList: TransferListTranslation } =
    translations || {};
  const colWidth = passwordChangeSignal || isUserUpdateForm ? 6 : 4;
  const emailColStyle = isUserUpdateForm && 'm-auto';
  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      {!passwordChangeSignal && (
        <Row md={12}>
          <Col md={4}>
            <InputField
              id="firstName"
              name="firstName"
              placeholder={Placeholders.firstName}
              onChange={onChangeHandler}
              value={state.firstName}
              error={errorMessageHandler(error, errors)}
              errorsHandler={setErrors}
              required
            />
          </Col>
          <Col md={4}>
            <InputField
              id="lastName"
              name="lastName"
              placeholder={Placeholders.lastName}
              onChange={onChangeHandler}
              value={state.lastName}
              error={errorMessageHandler(error, errors)}
              errorsHandler={setErrors}
              required
            />
          </Col>
          <Col md={4} className={`${emailColStyle}`}>
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder={Placeholders.email}
              onChange={onChangeHandler}
              value={state.email}
              error={errorMessageHandler(error, errors)}
              errorsHandler={setErrors}
              required
              inputPlaceholder={'email@email.com'}
            />
          </Col>
        </Row>
      )}
      <Row md={12}>
        {!passwordChangeSignal && (
          <Col md={colWidth}>
            <InputField
              id="username"
              name="username"
              placeholder={Placeholders.username}
              onChange={onChangeHandler}
              value={state.username}
              error={errorMessageHandler(error, errors)}
              errorsHandler={setErrors}
              required
            />
          </Col>
        )}
        {!isUserUpdateForm && (
          <Fragment>
            <Col md={colWidth}>
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder={Placeholders.password}
                onChange={onChangeHandler}
                value={state.password}
                error={errorMessageHandler(error, errors)}
                errorsHandler={setErrors}
                required
              />
            </Col>
            <Col md={colWidth}>
              <InputField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder={Placeholders.confirmPassword}
                onChange={onChangeHandler}
                value={state.confirmPassword}
                error={errorMessageHandler(error, errors)}
                errorsHandler={setErrors}
                required
                disabled={!state.password}
              />
              <ErrorLabel error={errors['passwordAndConfirmPasswordMatch']} />
            </Col>
          </Fragment>
        )}
      </Row>
      {!passwordChangeSignal && (
        <Row className="mt-4">
          <TransferList
            name={'roles'}
            itemsToChoose={rolesHashMapList}
            itemsSelected={rolesInitiallySelected}
            onChangeHandler={onRolesChangeHandler}
            targetPropToSelect={'roleName'}
            targetPropToChoose={'id'}
            error={errorMessageHandler(error, errors)}
            errorsHandler={setErrors}
            translations={TransferListTranslation}
          />
        </Row>
      )}
      <Row className="mt-4">
        <ButtonSave />
      </Row>
    </form>
  );
};

export default UserAlternateForm;
