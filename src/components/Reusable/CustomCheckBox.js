import React, { Fragment } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import ErrorLabel from './ErrorLabel';
import { isUndefined } from 'lodash';

export default function CustomCheckBox(props) {
  const { name, label, error, onChange, required, errorsHandler } = props || {};
  const errorMessage = error?.[name];
  const hasError = !isUndefined(errorMessage);

  const errorRemovalHandler = () => {
    errorsHandler((prevError) => {
      delete prevError[name];
      return prevError;
    });
  };

  return (
    <Fragment>
      <FormControlLabel
        control={
          <Checkbox
            className="text-left"
            checked={props.checked}
            name={name}
            onChange={(event) => {
              onChange(event);
              hasError && errorRemovalHandler();
            }}
            color="primary"
            required={required}
          />
        }
        label={label}
      />
      <ErrorLabel error={errorMessage} />
    </Fragment>
  );
}
