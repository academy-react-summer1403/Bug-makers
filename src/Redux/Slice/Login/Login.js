// src/Redux/Slice/Login/Login.js
import { createSlice } from '@reduxjs/toolkit';
import { getItem } from '../../../Core/Services/common/storage.services';

const LoginTokenSlice = createSlice({
  name: 'LoginToken',
  initialState: {
    token: null
  },
  reducers: {
    setLoginToken: (state, action) => {
      state.token = action.payload;
    },
    removeLoginToken: (state) => {
      state.token = null;
    },
  },
});

export const { setLoginToken, removeLoginToken } = LoginTokenSlice.actions;
export default LoginTokenSlice.reducer;
