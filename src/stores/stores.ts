import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '@/stores/slices/auth/loginSlice';
import userInfoSlice from '@/stores/slices/dashboard/userInfoSlice';
import userTransactionsSlice from '@/stores/slices/transactions/userTransactionsSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    userInfo: userInfoSlice,
    userTransactions: userTransactionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
