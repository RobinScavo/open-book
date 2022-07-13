import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import decksReducer from '../redux/decks/decksSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    decks: decksReducer
  },
});
