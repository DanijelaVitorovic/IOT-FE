import React, { Fragment } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import ErrorLabel from './ErrorLabel';
import { isUndefined } from 'lodash';

const ComboBoxAutocomplete = (props) => {
  const {
    error,
    multiple,
    id,
    data,
    textExtractor,
    changeValue,
    updateValue,
    style,
    disabled,
    placeholder,
    required,
    helperText,
    margin,
    disableClearable,
    errorsHandler,
  } = props || {};
  const errorMessage = error?.[id];
  const hasError = !isUndefined(errorMessage);
  const size = multiple ? 'medium' : 'small';

  const errorRemovalHandler = () => {
    errorsHandler((prevError) => {
      delete prevError[id];
      return prevError;
    });
  };

  const selectedOptionEqualityHandler = (option, value) => {
    if (option.id && value.id) {
      return option.id === value.id;
    } else if (value.value) {
      return option.value === value.value;
    } else {
      return option === value || value === null;
    }
  };

  return (
    <Fragment>
      <Autocomplete
        id={`combo-box-${id}`}
        options={data || []}
        getOptionLabel={(a) => textExtractor(a)}
        value={updateValue || null}
        style={{ ...style, padding: 0 }}
        fullWidth
        disabled={disabled}
        size={size}
        multiple={multiple}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              shrink: true,
            }}
            label={placeholder}
            variant="outlined"
            required={!!required}
            helperText={helperText}
            fullWidth
            margin={margin || 'normal'}
            error={hasError}
          />
        )}
        onChange={(event, selectedItem) => {
          changeValue(selectedItem);
          hasError && errorRemovalHandler();
        }}
        isOptionEqualToValue={selectedOptionEqualityHandler}
        disableClearable={!!disableClearable}
      />
      <ErrorLabel error={errorMessage} />
    </Fragment>
  );
};

export default ComboBoxAutocomplete;
