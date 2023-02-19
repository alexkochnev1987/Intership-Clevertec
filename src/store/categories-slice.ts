/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { HOST } from './book-slice';

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
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${HOST}/api/categories`);

    if (!response.ok) return rejectWithValue('Server Error');
    const data: Categories[] = await response.json();

    return data;
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
