import React, { useState } from 'react';
import { errorMessageHandler, basicFormValidationHandler } from '../../utils';
import { isEmpty } from 'lodash';
import InputField from '../Reusable/InputField';
import ButtonSave from '../Reusable/ButtonSave';
import { Row, Col } from 'react-bootstrap';
import TransferList from '../Reusable/TransferList';

const RoleForm = (props) => {
  const { saveHandler, translations, error, roleForUpdate, actionList } =
      props || {},
    {
      Placeholders,
      Errors,
      TransferList: TransferListTranslations,
    } = translations || {};
  const actionsInitiallySelected = roleForUpdate?.actions || [];

  const [roleName, setRoleName] = useState(roleForUpdate?.roleName || null);
  const [actions, setActions] = useState(
    getNamesFormActionsHandler(actionsInitiallySelected)
  );
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    setRoleName(event.target.value);
  };

  const onActionChangeHandler = (choosenActions) => {
    setActions(choosenActions);
  };

  const clientValidationHandler = () => {
    const errorsObject = basicFormValidationHandler({ roleName }, Errors);
    setErrors(errorsObject);
    return !isEmpty(errorsObject);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clientValidationHandler()) {
      return;
    }
    const roleForSave = {
      ...roleForUpdate,
      roleName,
      actions: mapItemsToActionsNamesHandler(actions, actionList),
    };
    saveHandler(roleForSave);
  };

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      <Row md={12}>
        <Col md={6} className="m-auto">
          <InputField
            id="roleName"
            name="roleName"
            placeholder={Placeholders.roleName}
            onChange={onChangeHandler}
            value={roleName}
            error={errorMessageHandler(error, errors)}
            errorsHandler={setErrors}
            required
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <TransferList
          name={'actions'}
          itemsToChoose={actionList}
          itemsSelected={actionsInitiallySelected}
          onChangeHandler={onActionChangeHandler}
          targetPropToSelect={'actionDescription'}
          targetPropToChoose={'actionName'}
          width={300}
          height={320}
          translations={TransferListTranslations}
        />
      </Row>
      <Row className="mt-4">
        <ButtonSave />
      </Row>
    </form>
  );
};

const getNamesFormActionsHandler = (actionList) => {
  return actionList?.map((role) => role['actionDescription']) || [];
};

const mapItemsToActionsNamesHandler = (selectedActions, actionList) =>
  selectedActions?.map(
    (selectedAction) =>
      actionList?.find((action) => action.actionDescription === selectedAction)
        ?.actionName
  ) || [];

export default RoleForm;
