import React, { useState } from 'react';
import { errorMessageHandler, basicFormValidationHandler } from '../../utils';
import { isEmpty } from 'lodash';
import InputField from '../Reusable/InputField';
import ButtonSave from '../Reusable/ButtonSave';
import { Row, Col } from 'react-bootstrap';

const FridgeForm = (props) => {
  const { saveHandler, translations, error, fridgeForUpdate, actionList } =
      props || {},
    { Placeholders, Errors, TransferList: TransferListTranslations } =
      translations || {};
  const actionsInitiallySelected = fridgeForUpdate?.actions || [];

  const [fridgeName, setFridgeName] = useState(fridgeForUpdate?.name || null);
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    setFridgeName(event.target.value);
  };

  const clientValidationHandler = () => {
    const errorsObject = basicFormValidationHandler({ fridgeName }, Errors);
    setErrors(errorsObject);
    return !isEmpty(errorsObject);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clientValidationHandler()) {
      return;
    }
    const fridgeForSave = {
      ...fridgeForUpdate,
      name: fridgeName,
    };
    saveHandler(fridgeForSave);
  };

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      <Row md={12}>
        <Col md={6} className="m-auto">
          <InputField
            id="fridgeName"
            name="fridgeName"
            placeholder={Placeholders.fridgeName}
            onChange={onChangeHandler}
            value={fridgeName}
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

export default FridgeForm;
