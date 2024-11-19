import { createSlice } from '@reduxjs/toolkit';

const help = createSlice({
  name: "help",
  initialState: {
    helpStatus: false,
  },
  reducers: {
    setHelpStatus: (state, action) => {
      state.helpStatus = action.payload;
    },
  },
});

export const { setHelpStatus } = help.actions;
export default help.reducer;