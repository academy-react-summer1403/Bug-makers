import { createSlice } from '@reduxjs/toolkit';

const SpechToTextSlice = createSlice({
  name: 'spechToText',
  initialState: {
    value: '',
  },
  reducers: {
    setVoiceType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setVoiceType } = SpechToTextSlice.actions;
export default SpechToTextSlice.reducer;