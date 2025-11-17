import { createSlice } from "@reduxjs/toolkit";
// utils
import axiosInstance from "../../../utils/axios";
//
import { dispatch } from "../../store";

// ----------------------------------------------------------------------

const initialState = {
  isFilterLoading: false,
  error: null,
  stores: null
};

const slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    // START LOADING
    startFirstLoading(state) {
      state.isFilterLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isFilterLoading = false;
      state.error = action.payload;
    },
    // GET STOREDATA
    setStores(state, action) {
      state.isFilterLoading = false;
      state.stores = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { isFilterLoading, hasError } = slice.actions;

// ----------------------------------------------------------------------

export function getStores(url) {
  return async () => {
    dispatch(slice.actions.startFirstLoading());
    try {
      const response = await axiosInstance.get(url);
      dispatch(slice.actions.setStores(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
