import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedButton: Number(localStorage.getItem('selectedButton')) || 0, 
  color: 'blue',
};

export const ThemeColorSlice = createSlice({
  name: 'themeColor',
  initialState,  
  reducers: {
    selectButton: (state, action) => {
      state.selectedButton = action.payload;
      localStorage.setItem('selectedButton', action.payload);
      if (action.payload === 0) {
        state.color = 'blue';
      } else if (action.payload === 1) {
        state.color = 'green';
      } else if (action.payload === 2) {
        state.color = 'yellow';
      }
    }
  }
});

export const { selectButton } = ThemeColorSlice.actions;

export default ThemeColorSlice.reducer;
