// src/Redux/Slice/Login/Login.js
import { createSlice } from '@reduxjs/toolkit';
import { getItem } from '../../../Core/Services/common/storage.services';

const towStepSlice = createSlice({
  name: "towStep",
  initialState: {
    TowStepConfig: [],
    PassWord: [],
  },
  reducers: {
    setTowStepCode: (state, action) => {
      state.TowStepConfig = action.payload;
    },
    setPassword: (state, action) => {
      state.PassWord = action.payload;
    },
    removeTowstep: (state) => {
      state.TowStepConfig = null;
      state.PassWord = null;
    },
  },
});

export const { setTowStepCode, setPassword, removeTowstep } = towStepSlice.actions;
export default towStepSlice.reducer;
