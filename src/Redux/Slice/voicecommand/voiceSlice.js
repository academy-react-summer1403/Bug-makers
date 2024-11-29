import { createSlice } from '@reduxjs/toolkit';

const VoiceSlice = createSlice({
  name: 'voice',
  initialState: {
    value: '',
  },
  reducers: {
    setVoiceAction: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setVoiceAction } = VoiceSlice.actions;
export default VoiceSlice.reducer;