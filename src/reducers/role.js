import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roleList: [],
  roleDTOList: [],
  rolesHashMapList: [],
  role: {},
  loading: false,
  error: undefined,
  actionList: [],
  totalElements: '',
};

const roleSlice = createSlice({
  name: 'role',
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
    addRoleAndReturnRoleDTO(state, action) {
      state.roleDTOList = [action.payload].concat(state.roleDTOList);
      state.error = undefined;
      state.loading = false;
    },
    updateRole(state, action) {
      state.roleDTOList = state.roleDTOList.map((role) =>
        role.id === action.payload.id ? action.payload : role
      );
      state.error = undefined;
      state.loading = false;
    },
    fetchAllRolesPageable(state, action) {
      state.roleDTOList = action.payload[0];
      state.numberOfPages = action.payload[1];
      state.totalElements = action.payload[2];
      state.error = undefined;
      state.loading = false;
    },
    fetchAllRoles(state, action) {
      state.roleList = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    deleteRole(state, action) {
      state.roleDTOList = state.roleDTOList.filter(
        (role) => role.id !== action.payload
      );
      state.error = undefined;
      state.loading = false;
    },
    fetchRoleById(state, action) {
      state.role = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    fetchAllRolesDTO(state, action) {
      state.roleDTOList = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    fetchAllRolesHashMapList(state, action) {
      state.rolesHashMapList = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    fetchAllActions(state, action) {
      state.actionList = action.payload;
      state.error = undefined;
      state.loading = false;
    },
  },
});

export const roleActions = roleSlice.actions;

export default roleSlice.reducer;
