import moment from 'moment';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { NotificationManager } from 'react-notifications';
import {
  sessionStorageConstants,
  notificationType,
  locale,
  appName,
} from './constants/globals';
import dot from 'dot-object';
import { isDate } from 'date-fns';

export const fetchLocaleFromSessionStorage = () => {
  return sessionStorage.getItem(sessionStorageConstants.LOCALE) || '';
};

export const fetchAppNameFromSessionStorage = () => {
  return sessionStorage.getItem(sessionStorageConstants.APP_NAME) || '';
};

export const fetchAppVersionFromSessionStorage = () => {
  return sessionStorage.getItem(sessionStorageConstants.APP_VERSION) || '';
};

export const formTranslation = () => {
  const applicationName = fetchAppNameFromSessionStorage() || appName.default;
  const languageVersion = fetchLocaleFromSessionStorage() || locale.default;
  return applicationName + '_' + languageVersion;
};

export const changePaginationTextToSerbian = (obj, of) => {
  return '' + obj.from + '-' + obj.to + of + obj.count;
};

export const formatDate = (date) => {
  return (date && moment(date).format('DD.MM.YYYY.')) || '';
};

export const formatDateWithTooltip = (date) => {
  const tooltipTitle = formatDateWithTimestamp(date);
  const dateFormat = moment(date).format('DD.MM.YYYY.');
  return (
    <Tooltip title={tooltipTitle} placement="top" arrow={true}>
      <div>{dateFormat}</div>
    </Tooltip>
  );
};

export const formatDateWithTimestamp = (date) => {
  return moment(date).format('DD.MM.YYYY. HH:mm:ss');
};

export const prepareDateForBE = (date) => {
  return moment(date).format();
};

export const formatDateToStartOfTheDay = (date) => {
  const formatedDate = moment(date).toDate();
  formatedDate.setHours(0);
  formatedDate.setMinutes(0);
  formatedDate.setSeconds(0);
  formatedDate.setMilliseconds(0);
  return prepareDateForBE(formatedDate);
};

export const errorMessageHandler = (error, clientError) => {
  return error ? error : clientError ? clientError : '';
};

export const basicFormValidationHandler = (
  objectForValidation,
  errorTranslations
) => {
  const dotNotationObj = dot(objectForValidation);
  let errorsObject = {};
  Object.entries(dotNotationObj?.separator)?.forEach((entry) => {
    const fieldValue =
      typeof entry[1] === 'string' ? entry[1]?.trim() : entry[1];
    if (
      !fieldValue ||
      fieldValue === '' ||
      fieldValue?.length === 0 ||
      (isDate(fieldValue) && !moment(fieldValue).isValid())
    ) {
      errorsObject[`${entry[0]}`] = errorTranslations[entry[0]];
    }
  });

  return errorsObject;
};

export const getUpdateValueItem = (list, targetProp, value) => {
  return list.find((item) => item[targetProp] === value);
};

export const createNotification = (type, titleMessage, descriptionMessage) => {
  switch (type) {
    case notificationType.info:
      NotificationManager.info(descriptionMessage, titleMessage, 3000);
      break;
    case notificationType.success:
      NotificationManager.success(descriptionMessage, titleMessage, 3000);
      break;
    case notificationType.warning:
      NotificationManager.warning(descriptionMessage, titleMessage, 3000);
      break;
    case notificationType.error:
      NotificationManager.error(descriptionMessage, titleMessage, 4200);
      break;
    default:
      break;
  }
};

export const getUserNameAndSurname = (user) => {
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  return firstName && lastName ? firstName + ' ' + lastName : '';
};

export const checkForUserRole = (roles, targetRoleId) => {
  if (!roles) return false;
  return (
    roles?.filter((role) => parseInt(role.id) === targetRoleId).length !== 0
  );
};

export const mailTrigger = ({ recipient, subject, body }) => {
  const emailBody = (body && body) || '';
  window.open(`mailto:${recipient}?subject=${subject}&body=${emailBody}`);
};

export const substringToTargetText = (text, targetText) => {
  return text.substring(0, text.indexOf(targetText));
};

export const substringFromTargetText = (text, targetText) => {
  return text.substring(text.indexOf(targetText) + 1);
};
