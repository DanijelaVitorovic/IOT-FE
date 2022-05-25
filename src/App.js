import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from './reducers/index';
import { Switch, Route, useHistory } from 'react-router-dom';
import setJWTToken from './securityUtils/setJWTToken';
import SecuredRoute from './securityUtils/secureRoute';
import authorizationService, {
  authLogout,
} from './securityUtils/authorizationService';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './styles/scss/style.scss';
import 'react-notifications/lib/notifications.css';
import './styles/css/Notification.css';
import Login from './components/Security/Login';
import Dashboard from './components/Dashboard/Dashboard';
import LoadingIndicator from './components/Reusable/LoadingIndicator';
import { NotificationContainer } from 'react-notifications';
import UserList from './components/Containers/UserList';
import RoleList from './components/Containers/RoleList';
import userActionsRoutes from './constants/user-actions-routes';
import { logout, fetchAllowedActions } from './actions/security';
import {
  fetchAppVersionAndLocale,
  fetchUsernameGeneratorSignal,
  fetchTokenIntervals,
} from './actions/user';
import {
  fetchAppNameFromSessionStorage,
  fetchLocaleFromSessionStorage,
} from './utils';
import { isArray } from 'lodash';
import {
  defaultTokenInterval,
  localStorageConstants,
  sessionStorageConstants,
} from './constants/globals';
import LanguagePicker from './components/UI/LanguagePicker';
import AuthContext from './store/auth_context';
import { securityActions } from './reducers/security';
import { locationPath } from './constants/app-routes';
import UnauthorizedAccessPage from './securityUtils/UnauthorizedAccessPage';
import FridgeList from './components/Containers/FridgeList';

const jwtDecode = require('jwt-decode');
const jwtToken = localStorage.getItem(localStorageConstants.JWT_TOKEN);

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwtDecode(jwtToken);
  const validTokenCondition =
    !decoded_jwtToken.google2fa ||
    localStorage.getItem(localStorageConstants.GOOGLE_2FA_TOKEN);
  if (
    validTokenCondition &&
    !authorizationService.tokenExpirationCheck() &&
    sessionStorage.getItem(sessionStorageConstants.SHOULD_CHANGE_PASSWORD) ===
      'false'
  ) {
    store.dispatch(securityActions.setCurrentUser(decoded_jwtToken));
  } else {
    authLogout();
  }
}

const usernameGenerator =
  sessionStorage[sessionStorageConstants.USERNAME_GENERATOR];
let startRefreshSignal = true;

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUserReducer = useSelector((state) => state.loggedUserReducer);
  const { allowedActions, logoutLoading } = loggedUserReducer || {},
    { loadingActions, items } = allowedActions || {};

  const TOKEN_EXP_CHECK_INTEVRAL = localStorage.getItem(
    localStorageConstants.TOKEN_EXP_CHECK_INTEVRAL
  );
  const REFRESH_INTERVAL = localStorage.getItem(
    localStorageConstants.REFRESH_INTERVAL
  );
  const token = localStorage.getItem(localStorageConstants.JWT_TOKEN);
  useEffect(() => {
    !(fetchAppNameFromSessionStorage() && fetchLocaleFromSessionStorage()) &&
      dispatch(fetchAppVersionAndLocale());
    !usernameGenerator && dispatch(fetchUsernameGeneratorSignal());
    (!TOKEN_EXP_CHECK_INTEVRAL || !REFRESH_INTERVAL) &&
      dispatch(fetchTokenIntervals());
    let tokenCheckInterval = false;
    let tokenRefreshInterval = false;
    if (token) {
      dispatch(fetchAllowedActions());
      if (startRefreshSignal) {
        tokenRefreshInterval = setInterval(() => {
          authorizationService.startRefresh();
        }, REFRESH_INTERVAL || defaultTokenInterval.REFRESH_INTERVAL);
        tokenCheckInterval = setInterval(() => {
          const expired = authorizationService.tokenExpirationCheck();
          expired && dispatch(logout(history));
        }, TOKEN_EXP_CHECK_INTEVRAL || defaultTokenInterval.TOKEN_EXP_CHECK_INTEVRAL);
      }
      startRefreshSignal = false;
    } else {
      tokenCheckInterval && clearInterval(tokenCheckInterval);
      tokenRefreshInterval && clearInterval(tokenRefreshInterval);
    }
  }, [dispatch, history, token, TOKEN_EXP_CHECK_INTEVRAL, REFRESH_INTERVAL]);

  const checkRoute = (component, route, allowedActions) => {
    const action = userActionsRoutes[route];

    if (action && isArray(action)) {
      action.forEach((element) => {
        if (allowedActions?.includes(element)) {
          return;
        }
      });
      return component;
    } else if (action && allowedActions?.includes(action)) {
      return component;
    }

    return Dashboard;
  };

  return (
    <AuthContext.Provider
      value={{
        ...loggedUserReducer,
        allowedActions: items,
      }}
    >
      <LanguagePicker />
      <LoadingIndicator loading={logoutLoading || loadingActions} />
      <Switch>
        <Route exact path="/" component={Login} />
        <SecuredRoute
          exact
          path={locationPath.DASHBOARD}
          component={Dashboard}
        />
        <SecuredRoute
          exact
          path={locationPath.USER_LIST}
          component={checkRoute(UserList, locationPath.USER_LIST, items)}
        />
        <SecuredRoute
          exact
          path={locationPath.ROLE_LIST}
          component={checkRoute(RoleList, locationPath.ROLE_LIST, items)}
        />
        <SecuredRoute
          exact
          path={locationPath.FRIDGE_LIST}
          component={checkRoute(FridgeList, locationPath.FRIDGE_LIST, items)}
        />
        <Route path={'/*'} component={UnauthorizedAccessPage} />
      </Switch>
      <NotificationContainer />
    </AuthContext.Provider>
  );
}

export default App;
