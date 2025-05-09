import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import categoryReducer from './slices/category';
import transactionTypeReducer from './slices/transactionType';
import transactionReducer from './slices/transactions';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    transactionType: transactionTypeReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
