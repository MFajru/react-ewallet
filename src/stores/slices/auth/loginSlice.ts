import customFetch from '@/lib/customFetch';
import { IFormData } from '@/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type TLogin = {
  message: string;
  data: {
    token: string;
  };
};

export interface LoginState {
  response: TLogin;
  status: 'idle' | 'success' | 'loading' | 'failed';
}

const initialState: LoginState = {
  response: {
    message: '',
    data: {
      token: '',
    },
  },
  status: 'idle',
};

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (body: IFormData) => {
    try {
      const response = await customFetch('auth/sessions', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Login failed, ${result.message}`);
      }
      Cookies.set('token', result.data.token, { expires: 1 });
      return result as TLogin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    addCookiesLogin: (state, action: PayloadAction<LoginState>) => {
      state.response = action.payload.response;
      state.status = action.payload.status;
    },
    removeCookies: (state) => {
      state.response = {
        message: '',
        data: {
          token: '',
        },
      };
      state.status = 'idle';
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'success';
        state.response = action.payload;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addCookiesLogin, removeCookies } = loginSlice.actions;

export default loginSlice.reducer;
