import { createSlice } from '@reduxjs/toolkit';

const ClientInfoSlice = createSlice({
  name: "Client",
  initialState: {
    ClientInfo: [],
  },
  reducers: {
    setClientInfo: (state, action) => {
      state.ClientInfo = action.payload;
    },
  },
});

export const { setClientInfo } = ClientInfoSlice.actions;
export default ClientInfoSlice.reducer;


