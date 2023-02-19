/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { HOST } from './book-slice';
import { setLoadingFalse, setLoadingTrue } from './loader-slice';

export interface ImageBook {
  url: string;
}

export interface Comment {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
}

export interface BookDescription {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  isbn: string;
  producer: string;
  authors: string[];
  images: ImageBook[];
  categories: string[];
  comments: Comment[];
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
  book: BookDescription | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: BookReducerState = {
  book: null,
  loading: false,
  error: undefined,
};

export const fetchDescription = createAsyncThunk<BookDescription, string, { rejectValue: string }>(
  'books/fetchBookById',
  async (id: string, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    const response = await fetch(`${HOST}/api/books/${id}`);

    if (!response.ok) {
      dispatch(setLoadingFalse());

      return rejectWithValue('Server Error');
    }
    const data: BookDescription = await response.json();

    dispatch(setLoadingFalse());

    return data;
  }
);

const descriptionSlice = createSlice({
  name: 'description',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDescription.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchDescription.fulfilled, (state, action) => {
        state.book = action.payload;
        state.loading = false;
      })
      .addCase(fetchDescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const description = descriptionSlice.reducer;
