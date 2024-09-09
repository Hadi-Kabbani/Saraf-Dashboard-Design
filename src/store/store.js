import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {thunk} from 'redux-thunk';
import transactionReducer from './TransactionSlice';
const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add thunk middleware
});

export default store;
