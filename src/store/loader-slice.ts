/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface LoaderState {
  counter: number;
  loading: boolean;
}

const initialState: LoaderState = {
  counter: 0,
  loading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.counter += 1;
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.counter -= 1;
      if (state.counter === 0) state.loading = false;
    },
  },
});

export const { setLoadingFalse, setLoadingTrue } = loaderSlice.actions;

export const loader = loaderSlice.reducer;
