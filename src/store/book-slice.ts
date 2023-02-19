/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const HOST = 'https://strapi.cleverland.by';

export interface Book {
  issueYear: string;
  rating: number;
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
  categories: Categories[];
  books: Book[];
  loading: boolean;
  error: string | undefined;
}

const initialState: BookReducerState = {
  categories: [],
  books: [],
  loading: false,
  error: undefined,
};

interface Categories {
  name: string;
  path: string;
  id: number;
}

export const fetchBooks = createAsyncThunk<Book[], undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${HOST}/api/books`);

    if (!response.ok) return rejectWithValue('Server Error');
    const data: Book[] = await response.json();

    return data;
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
