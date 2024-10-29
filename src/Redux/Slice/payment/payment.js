import { createSlice } from '@reduxjs/toolkit';

const payment = createSlice({
  name: "pay",
  initialState: {
    paymentList: [],
  },
  reducers: {
    setpaymentList: (state, action) => {
      state.paymentList = action.payload;
    },
  },
});

export const { setpaymentList } = payment.actions;
export default payment.reducer;