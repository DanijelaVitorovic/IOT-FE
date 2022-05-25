import 'date-fns';
import React, { useState, useEffect, Fragment } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider,
  DesktopDatePicker as MuiDatePicker,
} from '@mui/lab';
import withTranslations from '../../utils/HighOrderComponent';
import { TextField } from '@mui/material';
import sr from 'date-fns/locale/sr-Latn';
import sr_cyr from 'date-fns/locale/sr';
import { fetchLocaleFromSessionStorage } from '../../utils';
import ErrorLabel from './ErrorLabel';
import { isUndefined } from 'lodash';
import { isValid } from 'date-fns';

const localeMap = {
  sr,
  sr_cyr,
};

function DatePicker({
  t,
  value,
  name,
  label,
  disabled,
  onChange,
  error,
  minDate,
  maxDate,
  required,
  minDateMessage,
  margin,
  variant,
  size,
  fullWidth,
  errorsHandler,
  readOnly,
}) {
  const { Placeholders } = t || {};
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const insertedDate = isValid(value) ? value : null;
    setSelectedDate(insertedDate);
  }, [value]);

  const errorMessage = error?.[name];
  const hasError = !isUndefined(errorMessage);

  const onDateChangeLocalHandler = (newValue) => {
    setSelectedDate(newValue);
    onChange(newValue);
    hasError && errorRemovalHandler();
  };

  const errorRemovalHandler = () => {
    errorsHandler((prevError) => {
      delete prevError[name];
      return prevError;
    });
  };

  const activeLocale = fetchLocaleFromSessionStorage();

  return (
    <Fragment>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={localeMap[activeLocale]}
      >
        <MuiDatePicker
          label={label}
          inputFormat="dd/MM/yyyy"
          value={selectedDate}
          onChange={onDateChangeLocalHandler}
          renderInput={(params) => {
            return (
              <TextField
                ref="dateInput"
                {...{
                  ...params,
                  inputProps: {
                    ...params.inputProps,
                    placeholder: Placeholders.dateFormat,
                    readOnly: !!readOnly,
                  },
                }}
                id={`date-picker-${name}`}
                InputLabelProps={{
                  shrink: true,
                }}
                required={!!required}
                margin={margin || 'none'}
                error={hasError}
                size={size || 'small'}
                fullWidth={fullWidth || true}
              />
            );
          }}
          variant={variant || 'outlined'}
          name={name}
          disabled={disabled}
          autoOk={true}
          minDate={minDate}
          maxDate={maxDate}
          minDateMessage={minDateMessage}
          PopperProps={{
            placement: 'auto',
          }}
          reduceAnimations={true}
        />
        <ErrorLabel error={errorMessage} />
      </LocalizationProvider>
    </Fragment>
  );
}

export default withTranslations(DatePicker, 'DatePicker');
