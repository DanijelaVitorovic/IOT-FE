import React, { useState, useEffect } from 'react';
import { errorMessageHandler, basicFormValidationHandler } from '../../utils';
import { isEmpty } from 'lodash';
import InputField from '../Reusable/InputField';
import ButtonSave from '../Reusable/ButtonSave';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FridgeFormForDetails = (props) => {
  const {
      fetchFridgeById,
      dispatch,
      translations,
      error,
      fridgeForDetails,
      fridgeFromReducer,
    } = props || {},
    { Placeholders, Errors } = translations || {};

  useEffect(() => {
    dispatch(fetchFridgeById(fridgeForDetails?.id));
  }, [fridgeForDetails, dispatch]);

  const yesIcon = (
    <div style={{ marginLeft: '-20%' }}>
      <Link to="#">
        <i className="fas fa-check" />
      </Link>
    </div>
  );

  const noIcon = (
    <div style={{ marginLeft: '-20%' }}>
      <Link to="#">
        <i className="fas fa-exclamation" />
      </Link>
    </div>
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();

    dispatch(fetchFridgeById(fridgeFromReducer?.id));
  };

  return (
    <form noValidate={true} onSubmit={onSubmitHandler}>
      <div>
        <Row md={12} style={{ margin: 'auto', marginLeft: '-13%' }}>
          <div className="text-center">
            <br></br>
            {fridgeFromReducer.milk ? yesIcon : noIcon}
            <div style={{ marginLeft: '15%', marginTop: '-3%' }}>
              {fridgeFromReducer.milk
                ? Placeholders.milkYes
                : Placeholders.milkNo}
            </div>
          </div>
          <div className="text-center">
            <br></br>
            {fridgeFromReducer.eggs ? yesIcon : noIcon}
            <div style={{ marginLeft: '15%', marginTop: '-3%' }}>
              {fridgeFromReducer.eggs
                ? Placeholders.eggsYes
                : Placeholders.eggsNo}
            </div>
          </div>
          <div className="text-center">
            <br></br>
            {fridgeFromReducer.meat ? yesIcon : noIcon}
            <div style={{ marginLeft: '15%', marginTop: '-3%' }}>
              {fridgeFromReducer.meal
                ? Placeholders.mealYes
                : Placeholders.mealNo}
            </div>
          </div>
        </Row>
        <Row className="mt-4">
          <ButtonSave signalForPreview />
        </Row>
      </div>
    </form>
  );
};

export default FridgeFormForDetails;
