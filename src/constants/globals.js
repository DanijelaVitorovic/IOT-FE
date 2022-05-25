export const activePage = 0;
export const numberOfItemsPerPage = 10;
export const maxNumberOfItemsPerPage = 100;
export const uploadFileMaxSize = 50 * 1024 * 1024; // byte
export const rowsPerPageOptions = [10, 20, 50, 100];
export const allowedFileFormats =
  '.pdf, vnd.openxmlformats-officedocument.wordprocessingml.document, .png, .jpg, .jpeg, .jfif ,.gif, ' +
  'vnd.openxmlformats-officedocument.spreadsheetml.sheet, vnd.ms-excel, msword, plain, mp4, quicktime, x-ms-wmv, x-msvideo';
export const allowedImageFormats = '.png, .jpg, .jpeg, .jfif';
export const allowedFileFormatsText =
  '.pdf, .docx, .png, .jpg, .gif, .xlsx, .csv, .doc, .txt, .mp4, .mov, .wmv, .avi';

export const appName = {
  default: 'default',
};
export const locale = {
  default: 'sr',
  sr: 'sr',
  sr_cyr: 'sr_cyr',
};

export const notificationType = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export const localStorageConstants = {
  JWT_TOKEN: 'jwtToken',
  REFRESH_TOKEN: 'refreshToken',
  GOOGLE_2FA_TOKEN: 'google2faToken',
  USER_ROLE_REGEX: 'userRoleRegex',
  TOKEN_EXP_CHECK_INTEVRAL: 'checkTokenExpInterval',
  REFRESH_INTERVAL: 'startRefreshInterval',
};

export const sessionStorageConstants = {
  LOCALE: 'locale',
  APP_NAME: 'appName',
  APP_VERSION: 'appVersion',
  USERNAME_GENERATOR: 'usernameGen',
  SHOULD_CHANGE_PASSWORD: 'passChange',
};

export const tableNames = {
  USER: 'User',
};

export const searchOperators = {
  EQUAL: { value: '=' },
  LIKE: { value: 'LIKE' },
  IN: { value: 'IN' },
  GREATER_THAN: { value: '>' },
  LESS_THAN: { value: '<' },
  GREATER_THAN_OR_EQUAL: { value: '>=' },
  LESS_THAN_OR_EQUAL: { value: '<=' },
  NOT_EQUAL: { value: '!' },
  IS_NULL: { value: 'IsNull' },
  IS_NOT_NULL: { value: 'NotNull' },
};

export const defaultTokenInterval = {
  TOKEN_EXP_CHECK_INTEVRAL: 300000,
  REFRESH_INTERVAL: 700000,
};

export const fieldsArrayTypes = {
  DATE: 'date',
  OBJECT: 'object',
  ENUM: 'enum',
  TEXT: 'text',
};

export const formFieldTypes = {
  TEXT: 'text',
  STRING: 'STRING',
  LONG_STRING: 'LONG_STRING',
  AUTOCOMPLETE: 'autocomplete',
  COMBO_BOX: 'COMBO_BOX',
  DATE: 'date',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
};

export const columnTypes = {
  value: 'value',
  action: 'action',
  subobject: 'subobject',
  condition_action: 'condition_action',
  actionWhenKeyIsAction: 'actionWhenKeyIsAction',
  date: 'date',
  boolean: 'boolean',
  enum: 'enum',
};
