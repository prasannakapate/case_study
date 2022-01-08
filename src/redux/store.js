import { configureStore } from '@reduxjs/toolkit';
import { loadState } from '../helper/localStorage';
import userReducer from '../feature/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loadState(),
});
