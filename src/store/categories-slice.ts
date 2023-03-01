/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { categoriesRequestUrl, HOST } from '../constants/api';

import { setLoadingFalse, setLoadingTrue } from './loader-slice';

interface CategoriesReducerState {
  categories: Categories[];
  loading: boolean;
  error: string | undefined;
}

const initialState: CategoriesReducerState = {
  categories: [],
  loading: false,
  error: undefined,
};

interface Categories {
  name: string;
  path: string;
  id: number;
}

export const fetchCategories = createAsyncThunk<Categories[], undefined, { rejectValue: string }>(
  'books/fetchCategories',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.get<Categories[]>(HOST + categoriesRequestUrl);
      const { data } = response;

      return data;
    } catch (error) {
      return rejectWithValue('Server Error');
    } finally {
      dispatch(setLoadingFalse());
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const categories = categoriesSlice.reducer;
