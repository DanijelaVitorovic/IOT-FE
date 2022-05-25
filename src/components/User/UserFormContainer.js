import React, { useEffect, useState } from 'react';
import { errorMessageHandler, basicFormValidationHandler } from '../../utils';
import { isEmpty } from 'lodash';
import UserForm from './UserForm';
import UserAlternateForm from './UserAlternateForm';
import { sessionStorageConstants } from '../../constants/globals';

const UserFormContainer = (props) => {
  const {
      saveHandler,
      translations,
      error,
      userForUpdate,
      rolesHashMapList,
      passwordChangeSignal,
      generatedUsername,
      generatedPassword,
      usernameGeneratorHandler,
      passwordGeneratorHandler,
    } = props || {},
    { Errors } = translations || {};

  const rolesInitiallySelected = userForUpdate?.roles || [];
  const isUserUpdateForm = userForUpdate && !passwordChangeSignal;
  const shouldRenderUsernameGenerator =
    sessionStorage[sessionStorageConstants.USERNAME_GENERATOR] === 'true';

  const [state, setState] = useState({
    firstName: userForUpdate?.firstName || null,
    lastName: userForUpdate?.lastName || null,
    username: userForUpdate?.username || null,
    password: generatedPassword || userForUpdate?.password || null,
    confirmPassword: userForUpdate?.confirmPassword || null,
    email: userForUpdate?.email || null,
  });
  const [roles, setRoles] = useState(
    getNamesFormRolesHandler(rolesInitiallySelected)
  );
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    changeState(event.target.name, event.target.value);
  };

  function changeState(propName, value) {
    setState((prevState) => ({ ...prevState, [propName]: value }));
  }

  const onRolesChangeHandler = (checkedRoles) => {
    setRoles(checkedRoles);
  };

  const clientValidationHandler = () => {
    const { firstName, lastName, username, password, email, confirmPassword } =
      state;
    let errorsObject = null;

    if (!passwordChangeSignal) {
      errorsObject = basicFormValidationHandler(
        { firstName, lastName, username, roles, email },
        Errors
      );
    }

    if (!isUserUpdateForm) {
      const validation = basicFormValidationHandler({ password }, Errors);
      errorsObject = { ...errorsObject, ...validation };

      if (!shouldRenderUsernameGenerator) {
        if (!confirmPassword) {
          errorsObject['confirmPassword'] = Errors.confirmPassword;
        }
        if (password?.length < 8) {
          errorsObject['password'] = Errors.passwordLength;
        }
        if (confirmPassword && password && password !== confirmPassword) {
          errorsObject['passwordAndConfirmPasswordMatch'] =
            Errors.passwordAndConfirmPasswordMatch;
        }
      }
    }

    setErrors(errorsObject);
    return !isEmpty(errorsObject);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clientValidationHandler()) {
      return;
    }
    const userForSave = {
      ...userForUpdate,
      ...state,
      roles: mapRoleNamesToRolesHandler(roles, rolesHashMapList),
    };
    saveHandler(userForSave);
  };

  const onGenerateUsernameHandler = () => {
    const { firstName, lastName } = state;
    usernameGeneratorHandler(firstName, lastName);
  };

  useEffect(() => {
    generatedUsername && changeState('username', generatedUsername);
    generatedPassword && changeState('password', generatedPassword);
  }, [generatedUsername, generatedPassword]);

  return shouldRenderUsernameGenerator ? (
    <UserForm
      translations={translations}
      state={state}
      errors={errors}
      error={error}
      rolesHashMapList={rolesHashMapList}
      rolesInitiallySelected={rolesInitiallySelected}
      onChangeHandler={onChangeHandler}
      onRolesChangeHandler={onRolesChangeHandler}
      onSubmitHandler={onSubmitHandler}
      onGenerateUsernameHandler={onGenerateUsernameHandler}
      onGeneratePasswordHandler={passwordGeneratorHandler}
      errorMessageHandler={errorMessageHandler}
      isUserUpdateForm={isUserUpdateForm}
      passwordChangeSignal={passwordChangeSignal}
      setErrors={setErrors}
    />
  ) : (
    <UserAlternateForm
      translations={translations}
      state={state}
      errors={errors}
      error={error}
      rolesHashMapList={rolesHashMapList}
      rolesInitiallySelected={rolesInitiallySelected}
      onChangeHandler={onChangeHandler}
      onRolesChangeHandler={onRolesChangeHandler}
      onSubmitHandler={onSubmitHandler}
      onGenerateUsernameHandler={onGenerateUsernameHandler}
      onGeneratePasswordHandler={passwordGeneratorHandler}
      errorMessageHandler={errorMessageHandler}
      isUserUpdateForm={isUserUpdateForm}
      passwordChangeSignal={passwordChangeSignal}
      setErrors={setErrors}
    />
  );
};

const getNamesFormRolesHandler = (roleList) => {
  return roleList?.map((role) => role['roleName']) || [];
};

const mapRoleNamesToRolesHandler = (
  selectedRoleNames,
  roleObjects,
  userRoles
) => {
  if (userRoles?.roles.includes(selectedRoleNames)) return userRoles?.roles;
  return (
    selectedRoleNames?.map((selectedRole) =>
      roleObjects.find((role) => selectedRole === role.roleName)
    ) || []
  );
};

export default UserFormContainer;
