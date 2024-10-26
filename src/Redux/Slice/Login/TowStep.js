// src/Redux/Slice/Login/Login.js
import { createSlice } from '@reduxjs/toolkit';
import { getItem } from '../../../Core/Services/common/storage.services';

const towStepSlice = createSlice({
  name: 'towStep',
  initialState: {
    TowStepConfig:[],
    PassWord:[]
  },
  reducers: {
    setTowStepCode: (state, action) => {
      state.TowStepConfig = action.payload;
    },
    setPassword: (state, action) => {
      state.PassWord = action.payload;
    },
  },
});

export const { setTowStepCode , setPassword } = towStepSlice.actions;
export default towStepSlice.reducer;
