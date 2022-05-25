import React from 'react';
import { Field } from 'react-final-form';
import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from '../KeybordDatePicker';
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Typography,
} from '@mui/material';
import { formFieldTypes } from '../../../constants/globals';

const TextFieldAdapter = ({ input, meta, variant, size, ...rest }) => {
  const { multiline, disabled, style } = rest || {};

  return (
    <TextField
      {...input}
      {...rest}
      onChange={(event) => input.onChange(event.target.value)}
      error={meta.touched && meta.error}
      fullWidth={true}
      multiline={multiline}
      variant={variant || 'outlined'}
      size={size || 'small'}
      style={
        style || !disabled
          ? ({ width: '100%' }, { backgroundColor: 'white' })
          : null
      }
      InputLabelProps={{
        shrink: true,
      }}
      className={'form-control'}
    />
  );
};

const AutocompleteAdapter = ({ input, meta, ...rest }) => {
  const { onChange, name, value } = input || {};
  const { getOptionLabel, label, options } = rest || {};
  const selectedOptionEqualityHandler = (option, currentValue) => {
    if (option.id && currentValue.id) {
      return option.id === currentValue.id;
    } else if (currentValue.value) {
      return option.value === currentValue.value;
    } else {
      return (
        option === currentValue || currentValue === '' || currentValue === null
      );
    }
  };

  return (
    <Autocomplete
      {...input}
      {...rest}
      id={name}
      options={options || []}
      getOptionLabel={(option) =>
        getOptionLabel ? getOptionLabel(option) : option
      }
      value={value || null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={meta.touched && meta.error}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      onChange={(event, selectedItem) => onChange(selectedItem)}
      size="small"
      isOptionEqualToValue={selectedOptionEqualityHandler}
    />
  );
};

const DatePickerAdapter = ({ input, meta, ...rest }) => {
  return (
    <DatePicker
      {...input}
      {...rest}
      error={meta.touched && meta.error}
      readOnly
    />
  );
};

const RadioButtonsAdapter = ({ input, meta, ...rest }) => {
  const { options, name } = rest || {};
  const renderOptions = (option) => (
    <FormControlLabel
      value={option.value}
      control={<Radio />}
      label={option.label}
    />
  );

  return (
    <RadioGroup row={true} aria-label={name} name={name} {...input}>
      {options.map(renderOptions)}
    </RadioGroup>
  );
};

const CheckboxAdapter = ({ input, meta, ...rest }) => {
  const { label, boldSignal } = rest || {};
  const { name } = input || {};
  const checkBoxLabel = boldSignal ? (
    <Typography className="checkBox-label">{label}</Typography>
  ) : (
    label
  );
  return (
    <FormControlLabel
      aria-label={name}
      name={name}
      {...input}
      control={<Checkbox />}
      label={checkBoxLabel}
    />
  );
};

const field = ({ field, values, translations, disable }) => {
  const {
    type,
    name,
    optionList,
    className,
    getOptionLabel,
    validate,
    condition,
    multiline,
    rows,
    size,
    boldSignal,
  } = field;

  const label = translations?.[name];

  if (condition && !condition(values)) {
    return null;
  }

  let renderedField = null;

  switch (type) {
    case formFieldTypes.LONG_STRING:
      renderedField = (
        <Field
          name={name}
          component={TextFieldAdapter}
          validate={validate}
          label={label}
          multiline={multiline || true}
          rows={rows || 5}
          disabled={disable}
        />
      );
      break;
    case formFieldTypes.TEXT:
    case formFieldTypes.STRING:
      renderedField = (
        <Field
          name={name}
          component={TextFieldAdapter}
          validate={validate}
          label={label}
          disabled={disable}
          size={size}
          required={validate && true}
        />
      );
      break;
    case formFieldTypes.AUTOCOMPLETE:
    case formFieldTypes.COMBO_BOX:
      renderedField = (
        <Field
          name={name}
          component={AutocompleteAdapter}
          options={optionList}
          label={label}
          getOptionLabel={getOptionLabel}
          disabled={disable}
          validate={validate}
          className={className}
        />
      );
      break;
    case formFieldTypes.DATE:
      renderedField = (
        <Field
          name={name}
          component={DatePickerAdapter}
          label={label}
          disabled={disable}
          validate={validate}
        />
      );
      break;
    case formFieldTypes.RADIO:
      renderedField = (
        <Field
          name={name}
          component={RadioButtonsAdapter}
          type="radio"
          label={label}
          validate={validate}
          disabled={disable}
          options={optionList}
        />
      );
      break;
    case formFieldTypes.CHECKBOX:
      renderedField = (
        <Field
          name={name}
          component={CheckboxAdapter}
          type="checkbox"
          label={label}
          validate={validate}
          disabled={disable}
          boldSignal={boldSignal}
        />
      );
      break;
    default:
      break;
  }

  return <div className={`field ${name}`}>{renderedField}</div>;
};

export default field;
