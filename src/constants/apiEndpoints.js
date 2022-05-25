// SECURITY

export const allowedActionsPath = () => '/api/user/get-allowed-actions';
export const loginPath = () => '/api/user/sign-up/login';
export const tokenIntervalsPath = () => '/api/user/find-token-intervals';
export const refreshTokenPath = () => `/api/user/refresh-token`;

// 2FA - ()
export const verify2faPath = (userId) =>
  `/api/user/sign-up/verify-2fa/${userId}`;
export const confirm2faPath = (id) => `/api/user/confirm-2fa/${id}`;
export const register2faPath = (id) => `/api/user/register-2fa/${id}`;
export const deactivate2faPath = (id) => `/api/user/deactivate-2fa/${id}`;

// USER
export const userPath = () => '/api/user';
export const userIdPath = (id) => `/api/user/${id}`;
export const userPageablePath = (pageNumber, pageSize) =>
  `/api/user/${pageNumber}/${pageSize}`;
export const userDeactivatePath = (id) => `/api/user/deactivate/${id}`;
export const userActivatePath = (id) => `/api/user/activate/${id}`;
export const userUpdatePasswordPath = () => `/api/user/update-password`;
export const userUsernameGeneratorPath = (firstName, lastName) =>
  `/api/user/generate-username/${firstName}/${lastName}`;
export const userPasswordGeneratorPath = () =>
  `/api/user/generate-random-password`;
export const usernameGeneratorSignalPath = () =>
  `/api/user/find-username-generator-signal`;

export const appVersionAndLocalePath = () =>
  `/api/user/find-app-version-and-locale`;
export const passwordChangePath = () => `/api/user/password-change-from-login`;

// ROLE

export const rolePath = () => '/api/role';
export const roleIdPath = (id) => `/api/role/${id}`;
export const roleFetchAllDTOPath = () => `/api/role/find-all-roles-dto`;
export const rolePageablePath = (pageNumber, pageSize) =>
  `/api/role/${pageNumber}/${pageSize}`;
export const roleFetchAllHashMapListPath = () =>
  `/api/role/find-all-roles-hash-map-list`;
export const roleAddAndReturnRoleDTOPath = () =>
  '/api/role/create-and-return-role-dto';
export const actionsFetchAllPath = () => `/api/role/find-all-actions`;

// ATTACHMENT
export const attachmentFetchPath = (documentName, controllerReference) =>
  `/api/${controllerReference}/find-attachment/${documentName}`;
export const attachmentDownloadPath = (uuidDocName, controllerReference) =>
  `/api/${controllerReference}/download-attachment/${uuidDocName}`;

// FILTER
export const filterPageablePath = () => `/api/filter/search`;
