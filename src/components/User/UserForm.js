import React, { Fragment } from 'react';
import InputField from '../Reusable/InputField';
import ButtonSave from '../Reusable/ButtonSave';
import TransferList from '../Reusable/TransferList';
import { Row, Col } from 'react-bootstrap';
import CustomButton from '../Reusable/CustomButton';
import SendIcon from '@mui/icons-material/Send';
import ErrorLabel from '../Reusable/ErrorLabel';
import { sessionStorageConstants } from '../../constants/globals';

const UserForm = ({
  translations,
  state,
  errors,
  error,
  rolesHashMapList,
  rolesInitiallySelected,
  onChangeHandler,
  onRolesChangeHandler,
  onSubmitHandler,
  onGenerateUsernameHandler,
  onGeneratePasswordHandler,
  errorMessageHandler,
  isUserUpdateForm,
  passwordChangeSignal,
  setErrors,
}) => {
  const {
    Placeholders,
    TransferList: TransferListTranslation,
    Tooltips,
    Labels,
  } = translations || {};
  const shouldRenderUsernameGenerator =
    sessionStorage[sessionStorageConstants.USERNAME_GENERATOR] === 'true';
  const disabledFormStyle =
    shouldRenderUsernameGenerator &&
    !(state.firstName && state.lastName) &&
    'preview-style';
  const emailColStyle = isUserUpdateForm && 'm-auto';
  const usernameColStyle = shouldRenderUsernameGenerator ? 7 : 12;
  const firstRowFirstAndLastNameColStyle = shouldRenderUsernameGenerator
    ? 3
    : 4;
  const usernameWrapperColStyle = shouldRenderUsernameGenerator ? 6 : 4;

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      {!passwordChangeSignal && (
        <Row md={12} className="col-md-12">
          <Col md={firstRowFirstAndLastNameColStyle}>
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
          <Col md={firstRowFirstAndLastNameColStyle}>
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
          <Col
            md={usernameWrapperColStyle}
            disabled
            className={`${disabledFormStyle}`}
          >
            <Col
              className={`d-flex flex-row gap-3 justify-conetnt-between align-items-center`}
            >
              {shouldRenderUsernameGenerator && (
                <Col md={5}>
                  <CustomButton
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={onGenerateUsernameHandler}
                    className="col-md-12"
                    label={Labels.generate}
                    tooltipText={Tooltips.generateUsername}
                  />
                </Col>
              )}
              <Col md={usernameColStyle}>
                <InputField
                  id="username"
                  name="username"
                  disabled={shouldRenderUsernameGenerator}
                  placeholder={Placeholders.username}
                  value={state.username}
                  onChange={onChangeHandler}
                  error={errorMessageHandler(error, errors)}
                  errorsHandler={setErrors}
                  required
                  dontShowErrLabel={shouldRenderUsernameGenerator}
                />
              </Col>
            </Col>
            {shouldRenderUsernameGenerator && (
              <Col md={12} className="d-flex justify-content-end">
                <ErrorLabel error={errors.username} />
              </Col>
            )}
          </Col>

          <hr className="mt-3" />
        </Row>
      )}
      <Row md={12} disabled className={`col-md-12 ${disabledFormStyle}`}>
        {!passwordChangeSignal && (
          <Col md={6} className={`${emailColStyle}`}>
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
        )}
        {!isUserUpdateForm && (
          <Fragment>
            <Col md={6} className={`${passwordChangeSignal && 'm-auto'}`}>
              <Col
                className={`d-flex flex-row gap-3 justify-conetnt-between align-items-center`}
              >
                <Col md={5}>
                  <CustomButton
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={onGeneratePasswordHandler}
                    className="col-md-12"
                    label={Labels.generate}
                    tooltipText={Tooltips.generatePassword}
                  />
                </Col>
                <Col md={7}>
                  <InputField
                    id="password"
                    name="password"
                    type="password"
                    passwordVisibility={true}
                    placeholder={Placeholders.password}
                    value={state.password}
                    error={errorMessageHandler(error, errors)}
                    errorsHandler={setErrors}
                    required
                    disabled
                    dontShowErrLabel={shouldRenderUsernameGenerator}
                  />
                </Col>
              </Col>
              <Col md={12} className="d-flex justify-content-end">
                <ErrorLabel error={errors.password} />
              </Col>
            </Col>

            <hr className="mt-3" />
          </Fragment>
        )}
      </Row>
      {!passwordChangeSignal && (
        <Row disabled className={`mt-4 ${disabledFormStyle}`}>
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
            width={280}
          />
        </Row>
      )}
      <Row disabled className={`mt-4 ${disabledFormStyle}`}>
        <ButtonSave />
      </Row>
    </form>
  );
};

export default UserForm;
