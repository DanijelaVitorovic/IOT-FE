import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

const initialState = {
  loggedUser: {},
  validToken: false,
  qrCode: '',
  allowedActions: {
    loadingActions: false,
    items: [],
    error: undefined,
  },
  loading: false,
  logoutLoading: false,
  error: undefined,
};

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    clearError(state) {
      state.error = undefined;
    },
    actionStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    actionError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchAllowedActionsStart(state) {
      state.allowedActions = {
        items: [],
        error: undefined,
        loadingActions: true,
      };
    },
    fetchAllowedActions(state, action) {
      state.allowedActions = {
        items: action.payload,
        error: undefined,
        loadingActions: false,
      };
    },
    fetchAllowedActionsError(state, action) {
      state.allowedActions = {
        items: [],
        error: action.payload,
        loadingActions: false,
      };
    },
    register2fa(state, action) {
      state.qrCode = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    setCurrentUser(state, action) {
      state.validToken = !isEmpty(action.payload);
      state.loggedUser = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    changePasswordByUser(state) {
      state.loading = false;
      state.error = undefined;
    },
  },
});

export const securityActions = securitySlice.actions;

export default securitySlice.reducer;
