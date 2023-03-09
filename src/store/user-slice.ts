/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { forgotPassword, HOST, loginUserRequestUrl, registerUserRequestUrl, resetPassword } from '../constants/api';

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

export const userSendEmail = createAsyncThunk<{ ok: boolean }, { email: string }, { rejectValue: string }>(
  'user/sendEmail',
  async (body, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.post<{ ok: boolean }>(HOST + forgotPassword, body);
      const { data } = response;

      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          return rejectWithValue(e.message);
        }
      }

      return rejectWithValue('Server Error');
    } finally {
      dispatch(setLoadingFalse());
    }
  }
);

export interface ResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export const userResetPassword = createAsyncThunk<UserResponse, ResetPasswordRequest, { rejectValue: string }>(
  'user/resetPassword',
  async (body, { rejectWithValue, dispatch }) => {
    dispatch(setLoadingTrue());
    try {
      const response = await axios.post<UserResponse>(HOST + resetPassword, body);
      const { data } = response;

      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          return rejectWithValue(e.message);
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
  registration: boolean;
  error: string | undefined;
  sendEmail: boolean;
  changePassword: boolean;
}

const initialState: UserReducerState = {
  user: null,
  jwt: '',
  error: undefined,
  registration: false,
  sendEmail: false,
  changePassword: false,
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
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
        localStorage.setItem('jwt', action.payload.jwt);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registration = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userSendEmail.pending, (state) => {
        state.error = undefined;
      })
      .addCase(userSendEmail.fulfilled, (state, action) => {
        state.sendEmail = true;
      })
      .addCase(userSendEmail.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userResetPassword.pending, (state) => {
        state.error = undefined;
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.changePassword = true;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setUser, resetError } = userSlice.actions;
export const user = userSlice.reducer;
