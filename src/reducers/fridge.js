import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fridgeList: [],
  fridge: {},
  loading: false,
  error: undefined,
  totalElements: '',
};

const fridgeSlice = createSlice({
  name: 'fridge',
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
    addFridge(state, action) {
      state.fridgeList = [action.payload].concat(state.fridgeList);
      state.error = undefined;
      state.loading = false;
    },
    updateFridge(state, action) {
      state.fridgeList = state.fridgeList.map((fridge) =>
        fridge.id === action.payload.id ? action.payload : fridge
      );
      state.error = undefined;
      state.loading = false;
    },
    fetchAllFridgesPageble(state, action) {
      state.fridgeList = action.payload[0];
      state.numberOfPages = action.payload[1];
      state.totalElements = action.payload[2];
      state.error = undefined;
      state.loading = false;
    },
    fetchAllFridges(state, action) {
      state.fridgeList = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    deleteFridge(state, action) {
      state.fridgeList = state.fridgeList.filter(
        (fridge) => fridge.id !== action.payload
      );
      state.error = undefined;
      state.loading = false;
    },
    fetchFridgeById(state, action) {
      state.fridge = action.payload;
      state.error = undefined;
      state.loading = false;
    },
  },
});

export const fridgeActions = fridgeSlice.actions;

export default fridgeSlice.reducer;
