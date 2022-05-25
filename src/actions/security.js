import apiService from '../utils/apiService';
import setJWTToken, { set2FAToken } from '../securityUtils/setJWTToken';
import {
  confirm2faPath,
  register2faPath,
  verify2faPath,
  allowedActionsPath,
  loginPath,
  passwordChangePath,
} from '../constants/apiEndpoints';
import { securityActions } from '../reducers/security';
import {
  localStorageConstants,
  notificationType,
  sessionStorageConstants,
} from '../constants/globals';
import { createNotification } from '../utils';
import { userActions } from '../reducers/user';
import { locationPath } from '../constants/app-routes';
import { errorAction } from '../utils/actions';

const jwtDecode = require('jwt-decode');

export const fetchAllowedActions = () => {
  return (dispatch) => {
    dispatch(securityActions.fetchAllowedActionsStart());
    return apiService
      .get(allowedActionsPath())
      .then((response) => {
        dispatch(securityActions.fetchAllowedActions(response.data));
      })
      .catch((err) => {
        dispatch(securityActions.fetchAllowedActionsError(err?.response?.data));
      });
  };
};

export const login =
  (
    loginRequest,
    show2faVerificationModal,
    modalUserChangePasswordShowHandler,
    messages,
    history
  ) =>
  (dispatch) => {
    dispatch(securityActions.actionStart());
    return apiService
      .post(loginPath(), loginRequest)
      .then((response) => {
        const decodedToken = setTokensAndDecodeToken(response?.data);
        dispatch(securityActions.setCurrentUser(decodedToken));
        const shouldChangePassword = response?.data?.shouldChangePassword;
        sessionStorage.setItem(
          sessionStorageConstants.SHOULD_CHANGE_PASSWORD,
          shouldChangePassword
        );
        if (shouldChangePassword) {
          modalUserChangePasswordShowHandler();
          return;
        }
        if (decodedToken?.google2fa) {
          show2faVerificationModal();
        } else {
          dispatch(deleteErrorSecurity());
          history.replace(locationPath.DASHBOARD);
        }
      })
      .catch((err) => {
        errorAction(err, securityActions.actionError, dispatch, messages);
      });
  };

export const setTokensAndDecodeToken = (res) => {
  const { token, refreshToken } = res || {};
  const decoded = jwtDecode(token);
  localStorage.setItem(localStorageConstants.JWT_TOKEN, token);
  localStorage.setItem(localStorageConstants.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(
    localStorageConstants.USER_ROLE_REGEX,
    decoded?.role?.regexDescription
  );
  setJWTToken(token);
  return decoded;
};

export const logout = (history) => (dispatch) => {
  dispatch(securityActions.actionStart());
  try {
    clearHeadersAndTokens();
    sessionStorage.clear();
    dispatch(securityActions.setCurrentUser({}));
    history.replace('/');
  } catch (err) {
    dispatch(securityActions.actionError(err));
  }
};

export const verify2fa = (verifyCode, userId, messages, history) => {
  return (dispatch) => {
    dispatch(securityActions.actionStart());
    return apiService
      .post(verify2faPath(userId), verifyCode)
      .then((response) => {
        verify2faSuccessfully(response, history);
      })
      .catch((err) => {
        localStorage.removeItem(localStorageConstants.GOOGLE_2FA_TOKEN);
        errorAction(err, securityActions.actionError, dispatch, messages);
      });
  };
};

export const passwordChange = (userPasswordChangingDTO, callback, messages) => {
  return (dispatch) => {
    dispatch(securityActions.actionStart());
    return apiService
      .put(passwordChangePath(), userPasswordChangingDTO)
      .then((response) => {
        dispatch(securityActions.changePasswordByUser());
        createNotification(
          notificationType.success,
          messages?.passwordChange,
          response?.data
        );
        callback();
      })
      .catch((err) => {
        errorAction(err, securityActions.actionError, dispatch, messages);
      });
  };
};

export const confirm2fa = (verifyCode, userId, callback, messages) => {
  return (dispatch) => {
    dispatch(securityActions.actionStart());
    return apiService
      .post(confirm2faPath(userId), verifyCode)
      .then((response) => {
        dispatch(userActions.updateUser(response?.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.success2faConfirm
        );
        callback();
      })
      .catch((err) => {
        errorAction(err, securityActions.actionError, dispatch, messages);
      });
  };
};

export const register2fa = (id) => {
  return (dispatch) => {
    dispatch(securityActions.actionStart());
    return apiService
      .get(register2faPath(id))
      .then((response) => {
        dispatch(securityActions.register2fa(response.data));
      })
      .catch((err) => {
        dispatch(securityActions.actionError(err?.response?.data));
      });
  };
};

export const clearHeadersAndTokens = () => {
  setJWTToken(false);
  set2FAToken(false);
  localStorage.clear();
};

export const deleteErrorSecurity = () => {
  return (dispatch) => {
    dispatch(securityActions.clearError());
  };
};

function verify2faSuccessfully(response, history) {
  const google2faToken = response.headers['x-2fa-token-update'];
  localStorage.setItem(localStorageConstants.GOOGLE_2FA_TOKEN, google2faToken);
  set2FAToken(google2faToken);
  history.replace(locationPath.DASHBOARD);
}
