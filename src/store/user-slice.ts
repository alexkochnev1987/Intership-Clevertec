/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { HOST, loginUserRequestUrl, registerUserRequestUrl } from '../constants/api';

import { setLoadingFalse, setLoadingTrue } from './loader-slice';

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface UserResponse {
  jwt: string;
  user: User;
}

interface LoginRequest {
  identifier: string;
  password: string;
}

export const loginUser = createAsyncThunk<UserResponse, LoginRequest, { rejectValue: string }>(
  'user/loginUser',
  async (body, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.post<UserResponse>(HOST + loginUserRequestUrl, body);
      const { data } = response;

      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          return rejectWithValue('400');
        }
      }

      return rejectWithValue('Server Error');
    } finally {
      dispatch(setLoadingFalse());
    }
  }
);

export interface RegistrationRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const registerUser = createAsyncThunk<UserResponse, RegistrationRequest, { rejectValue: string }>(
  'user/registerUser',
  async (body, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.post<UserResponse>(HOST + registerUserRequestUrl, body);
      const { data } = response;

      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          return rejectWithValue('400');
        }
      }

      return rejectWithValue('Server Error');
    } finally {
      dispatch(setLoadingFalse());
    }
  }
);

interface UserReducerState {
  user: User | null;
  jwt: string;
  loading: boolean;
  error: string | undefined;
}

const initialState: UserReducerState = {
  user: null,
  jwt: '',
  loading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.jwt = '';
      state.user = null;
    },
    setUser: (state, { payload }) => {
      state.jwt = payload.jwt;
      state.user = payload.user;
    },
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
        localStorage.setItem('jwt', action.payload.jwt);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
        localStorage.setItem('jwt', action.payload.jwt);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logoutUser, setUser, resetError } = userSlice.actions;
export const user = userSlice.reducer;
