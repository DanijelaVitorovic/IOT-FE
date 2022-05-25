import { localStorageConstants } from '../constants/globals';
import setJWTToken from '../securityUtils/setJWTToken';
import { clearHeadersAndTokens } from '../actions/security';
import { refreshTokenPath } from '../constants/apiEndpoints';
import apiService from '../utils/apiService';
const jwtDecode = require('jwt-decode');

const authorizationService = {
  isActionAllowed: (actionName, allowedActionsList) =>
    !!allowedActionsList?.find((a) => a === actionName),
  startRefresh: () => {
    const accessToken = localStorage.getItem(localStorageConstants.JWT_TOKEN);
    const refreshToken = localStorage.getItem(
      localStorageConstants.REFRESH_TOKEN
    );
    apiService
      .post(refreshTokenPath(), {
        token: accessToken,
        refreshToken,
      })
      .then((response) => {
        if (!response?.data?.success) {
          throw new Error();
        } else {
          localStorage.setItem(
            localStorageConstants.JWT_TOKEN,
            response.data.token
          );
          localStorage.setItem(
            localStorageConstants.REFRESH_TOKEN,
            response.data.refreshToken
          );
          setJWTToken(response.data.token);
        }
      })
      .catch(() => {
        clearValidTokenClearIntervalAndLogout();
        return;
      });
  },
  tokenExpirationCheck: () => {
    const jwtToken = localStorage.getItem(localStorageConstants.JWT_TOKEN);
    const token = jwtToken && jwtDecode(jwtToken);
    const currentTime = Date.now() / 1000;
    return token?.exp < currentTime;
  },
};

export const authLogout = () => {
  localStorage.removeItem(localStorageConstants.JWT_TOKEN);
  localStorage.removeItem(localStorageConstants.REFRESH_TOKEN);
  localStorage.removeItem(localStorageConstants.GOOGLE_2FA_TOKEN);
};

const clearValidTokenClearIntervalAndLogout = () => {
  clearHeadersAndTokens();
  authLogout();
};

export default authorizationService;
