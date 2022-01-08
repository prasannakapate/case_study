import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { saveUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
