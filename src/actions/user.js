import apiService from '../utils/apiService';
import { userActions } from '../reducers/user';
import {
  userPath,
  userIdPath,
  userDeactivatePath,
  userActivatePath,
  userPageablePath,
  userUpdatePasswordPath,
  deactivate2faPath,
  appVersionAndLocalePath,
  filterPageablePath,
  userUsernameGeneratorPath,
  userPasswordGeneratorPath,
  usernameGeneratorSignalPath,
  tokenIntervalsPath,
} from '../constants/apiEndpoints';
import { createNotification } from '../utils';
import {
  sessionStorageConstants,
  notificationType,
  appName,
  locale,
  localStorageConstants,
} from '../constants/globals';
import { translationsActions } from '../reducers/translations';
import { errorAction, filterSuccessAction } from '../utils/actions';

export const createUser = (user, callback, messages, pageSize) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .post(userPath(), user)
      .then((response) => {
        dispatch(userActions.addUser(response.data));
        callback();
        dispatch(fetchAllUsersPageble(0, pageSize));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successCreation
        );
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const updateUser = (user, callback, messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .put(userPath(), user)
      .then((response) => {
        dispatch(userActions.updateUser(response.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successUpdate
        );
        callback();
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const fetchUserById = (id) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(userIdPath(id))
      .then((response) => {
        dispatch(userActions.fetchUserById(response.data));
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const fetchAllUsers = () => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(userPath())
      .then((response) => {
        dispatch(userActions.fetchAllUsers(response.data));
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const fetchAllUsersPageble = (pageNumber, pageSize) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(userPageablePath(pageNumber, pageSize))
      .then((response) => {
        dispatch(
          userActions.fetchAllUsersPageable([
            response.data.content,
            response.data.totalPages,
            response.data.totalElements,
          ])
        );
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const deactivateUser = (id, messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .patch(userDeactivatePath(id))
      .then((response) => {
        dispatch(userActions.deactivateUser(response.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successDeactivation
        );
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const activateUser = (id, messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .patch(userActivatePath(id))
      .then((response) => {
        dispatch(userActions.activateUser(response.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successActivation
        );
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const updateUserPassword = (user, callback, messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .put(userUpdatePasswordPath(), user)
      .then((response) => {
        dispatch(userActions.updateUser(response.data));
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successPasswordUpdate
        );
        callback();
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const deactivate2fa = (id) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .patch(deactivate2faPath(id))
      .then((response) => {
        dispatch(userActions.deactivateUser2fa(response.data));
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const deleteUser = (id, messages, activePage, pageSize) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .delete(userIdPath(id))
      .then(() => {
        dispatch(userActions.deleteUser(id));
        dispatch(fetchAllUsersPageble(activePage, pageSize));
      })
      .then(() => {
        createNotification(
          notificationType.success,
          messages?.title,
          messages?.successDelete
        );
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const deleteErrorUser = () => {
  return (dispatch) => {
    dispatch(userActions.clearError());
  };
};

export const fetchAppVersionAndLocale = () => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(appVersionAndLocalePath())
      .then((response) => {
        setAppVersionAndLocale(response.data, dispatch);
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const fetchUsernameGeneratorSignal = () => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(usernameGeneratorSignalPath())
      .then((response) => {
        setUsernameGeneratorSignal(response.data, dispatch);
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const fetchTokenIntervals = () => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(tokenIntervalsPath())
      .then((response) => {
        setTokenIntervals(response.data, dispatch);
      })
      .catch((err) => {
        dispatch(userActions.actionError(err?.response?.data));
      });
  };
};

export const setUserTranslations = (translation) => {
  return (dispatch) => {
    dispatch(translationsActions.setUserTranslations(translation));
  };
};

export const filterAllUsersPageable = (searchData, messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .post(filterPageablePath(), searchData)
      .then((response) => {
        filterSuccessAction(
          response,
          userActions.fetchAllUsersPageable,
          dispatch,
          messages
        );
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const generateUsername = (firstName, lastName, messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(userUsernameGeneratorPath(firstName, lastName))
      .then((response) => {
        dispatch(userActions.generateUsername(response.data));
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const clearGeneratedUsername = () => {
  return (dispatch) => dispatch(userActions.generateUsername(''));
};

export const generatePassword = (messages) => {
  return (dispatch) => {
    dispatch(userActions.actionStart());
    return apiService
      .get(userPasswordGeneratorPath())
      .then((response) => {
        dispatch(userActions.generatePassword(response.data));
      })
      .catch((err) => {
        errorAction(err, userActions.actionError, dispatch, messages);
      });
  };
};

export const clearGeneratedPassword = () => {
  return (dispatch) => dispatch(userActions.generatePassword(''));
};

function setAppVersionAndLocale(data, dispatch) {
  const nameOfApp =
    Object.keys(appName)?.find((name) => name === data?.appName) ||
    appName.default;
  const appLocale =
    Object.keys(locale)?.find((loc) => loc === data?.appLocale) ||
    locale.default;
  sessionStorage.setItem(sessionStorageConstants.APP_NAME, nameOfApp);
  sessionStorage.setItem(sessionStorageConstants.LOCALE, appLocale);
  sessionStorage.setItem(
    sessionStorageConstants.APP_VERSION,
    data?.appVersion || ''
  );
  dispatch(userActions.setAppVersionAndLocale());
}

function setUsernameGeneratorSignal(data, dispatch) {
  sessionStorage.setItem(sessionStorageConstants.USERNAME_GENERATOR, data);
  dispatch(userActions.setUsernameSignal());
}

function setTokenIntervals(data, dispatch) {
  localStorage.setItem(
    localStorageConstants.REFRESH_INTERVAL,
    data?.startRefreshInterval || 800000
  );
  localStorage.setItem(
    localStorageConstants.TOKEN_EXP_CHECK_INTEVRAL,
    data?.checkTokenExpInterval || 660000
  );
  dispatch(userActions.setTokenIntervals());
}
