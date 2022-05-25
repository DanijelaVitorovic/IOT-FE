import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import securityReducer from './security';
import roleReducer from './role';
import navigationReducer from './navigation';
import translationsReducer from './translations';

const store = configureStore({
  reducer: {
    loggedUserReducer: securityReducer,
    userReducer,
    roleReducer,
    navigationReducer,
    translationsReducer,
  },
});

export default store;
