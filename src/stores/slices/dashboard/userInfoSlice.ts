import customFetch from '@/lib/customFetch';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
type TuserInfo = {
  message: string;
  data: {
    user_id: number;
    name: string;
    email: string;
    wallet_id: number;
    wallet_number: string;
    amount: string;
  };
};

export interface UsersState {
  response: TuserInfo;
  status: 'idle' | 'success' | 'loading' | 'failed';
}

const initialState: UsersState = {
  response: {
    message: '',
    data: {
      user_id: 0,
      name: '',
      email: '',
      wallet_id: 0,
      wallet_number: '',
      amount: '',
    },
  },
  status: 'idle',
};

export const fetchUserInfo = createAsyncThunk('user/userInfo', async () => {
  try {
    const token = Cookies.get('token');

    const response = await customFetch('users/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Something bad happened');
    }
    const result = await response.json();
    return result as TuserInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'success';
        state.response = action.payload;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userInfoSlice.reducer;
