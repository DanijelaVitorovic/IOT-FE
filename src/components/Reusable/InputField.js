import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import ErrorLabel from './ErrorLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { isUndefined } from 'lodash';

const InputField = (props) => {
  const {
    error,
    type,
    id,
    name,
    icon,
    placeholder,
    value,
    helperText,
    focused,
    autoFocus,
    disabled,
    required,
    autoComplete,
    multiline,
    rows,
    onlyPositive,
    className,
    variant,
    margin,
    passwordVisibility,
    onClick,
    onChange,
    onBlur,
    errorsHandler,
    dontShowErrLabel,
    inputPlaceholder,
  } = props || {};
  const [showPassword, setShowPassword] = useState(!!passwordVisibility);

  const size = props?.size || 'small';
  const fieldPlaceholder = icon ? (
    <span className="d-flex align-items-center">
      {icon}
      {placeholder}
    </span>
  ) : (
    placeholder
  );
  const isTypePassword = type === 'password';
  const inputType = isTypePassword && showPassword ? 'text' : type;
  const inputValue = value === null ? '' : value;
  const errorMessage = error?.[name];
  const hasError = !isUndefined(errorMessage);

  const onClickShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onMouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const errorRemovalHandler = () => {
    errorsHandler((prevError) => {
      delete prevError[name];
      return prevError;
    });
  };

  const inputEndAdornment = isTypePassword && (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onClickShowPasswordHandler}
        onMouseDown={onMouseDownPasswordHandler}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Fragment>
      <TextField
        id={`input-field-${id}`}
        name={name}
        label={fieldPlaceholder}
        type={inputType}
        value={inputValue}
        helperText={helperText}
        error={hasError}
        focused={!!focused}
        autoFocus={!!autoFocus}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete || ''}
        multiline={multiline}
        rows={rows}
        size={size}
        fullWidth
        className={className}
        variant={variant || 'outlined'}
        margin={margin || 'normal'}
        onClick={onClick}
        onChange={(event) => {
          onChange(event);
          hasError && errorRemovalHandler();
        }}
        onBlur={onBlur}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            min: onlyPositive && 0,
          },
          endAdornment: inputEndAdornment,
          placeholder: inputPlaceholder,
        }}
      />
      {!dontShowErrLabel && <ErrorLabel error={errorMessage} />}
    </Fragment>
  );
};

export default InputField;
