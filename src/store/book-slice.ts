/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { booksRequestUrl, HOST } from '../constants/api';

import { setLoadingFalse, setLoadingTrue } from './loader-slice';

export interface Book {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: string[];
  image: {
    url: string;
  } | null;
  categories: string[];
  id: number;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
  histories: [
    {
      id: number;
      userId: number;
    }
  ];
}

interface BookReducerState {
  books: Book[];
  loading: boolean;
  error: string | undefined;
}

const initialState: BookReducerState = {
  books: [],
  loading: false,
  error: undefined,
};

export const fetchBooks = createAsyncThunk<Book[], undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.get<Book[]>(HOST + booksRequestUrl);
      const { data } = response;

      return data;
    } catch (error) {
      return rejectWithValue('Server Error');
    } finally {
      dispatch(setLoadingFalse());
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const books = bookSlice.reducer;
