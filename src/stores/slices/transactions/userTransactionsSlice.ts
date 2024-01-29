import customFetch from '@/lib/customFetch';
import { TTransactionEntries } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type TSort = {
  column: string;
  OrderDir: string;
};

type TTransactionPageInfo = {
  s: string;
  page: number;
  limit: number;
  sorts: TSort[];
  start_date?: string;
  end_date?: string;
  total_row: number;
};

type TTransactionList = {
  message: string;
  data: {
    entries: TTransactionEntries[];
    page_info: TTransactionPageInfo;
  };
};

export interface TransactionState {
  response: TTransactionList;
  status: 'idle' | 'success' | 'loading' | 'failed';
}

const initialState: TransactionState = {
  response: {} as TTransactionList,
  status: 'idle',
};

type TFetchTransactions = {
  page: number;
  limit: number;
  sortBy: string;
  orderDir: string;
};

export const fetchUserTransactions = createAsyncThunk(
  'user/transactionList',
  async ({ page, limit, sortBy, orderDir }: TFetchTransactions) => {
    try {
      const token = Cookies.get('token');
      const response = await customFetch(
        `transactions?page=${page}&limit=${limit}&sort_by[]=${sortBy}&sort_dir[]=${orderDir}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Something bad happened');
      }
      const result = await response.json();
      return result as TTransactionList;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const userTransactionsSlice = createSlice({
  name: 'userTransactionsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.status = 'success';
        state.response = action.payload;
      })
      .addCase(fetchUserTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTransactions.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userTransactionsSlice.reducer;
