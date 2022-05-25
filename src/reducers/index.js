import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import securityReducer from './security';
import roleReducer from './role';
import navigationReducer from './navigation';
import translationsReducer from './translations';
import fridgeReducer from './fridge';

const store = configureStore({
  reducer: {
    loggedUserReducer: securityReducer,
    userReducer,
    roleReducer,
    navigationReducer,
    translationsReducer,
    fridgeReducer,
  },
});

export default store;
