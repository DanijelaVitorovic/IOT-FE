import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
  user: {},
  loading: false,
  error: undefined,
  totalElements: '',
  generatedUsername: '',
  generatedPassword: '',
};

const userSlice = createSlice({
  name: 'user',
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
    addUser(state, action) {
      state.userList = [action.payload].concat(state.userList);
      state.error = undefined;
      state.loading = false;
    },
    updateUser(state, action) {
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.error = undefined;
      state.loading = false;
    },
    fetchAllUsersPageable(state, action) {
      state.userList = action.payload[0];
      state.numberOfPages = action.payload[1];
      state.totalElements = action.payload[2];
      state.error = undefined;
      state.loading = false;
    },
    fetchAllUsers(state, action) {
      state.userList = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    deleteUser(state, action) {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload
      );
      state.error = undefined;
      state.loading = false;
    },
    fetchUserById(state, action) {
      state.user = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    activateUser(state, action) {
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.error = undefined;
      state.loading = false;
    },
    deactivateUser(state, action) {
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.error = undefined;
      state.loading = false;
    },
    deactivateUser2fa(state, action) {
      state.userList = state.userList.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.error = undefined;
      state.loading = false;
    },
    setAppVersionAndLocale(state) {
      state.error = undefined;
      state.loading = false;
    },
    generateUsername(state, action) {
      state.generatedUsername = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    generatePassword(state, action) {
      state.generatedPassword = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    setUsernameSignal(state) {
      state.error = undefined;
      state.loading = false;
    },
    setTokenIntervals(state) {
      state.error = undefined;
      state.loading = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
