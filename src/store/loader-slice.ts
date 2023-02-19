/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
  },
});

export const { setLoadingFalse, setLoadingTrue } = loaderSlice.actions;

export const loader = loaderSlice.reducer;
