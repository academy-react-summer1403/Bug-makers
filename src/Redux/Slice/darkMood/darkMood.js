import { createSlice } from '@reduxjs/toolkit'


export const darkMoodSlice = createSlice({
  name: "darkMood",
  initialState: {
    selectedDark: Number(localStorage.getItem("dark")) || 0,
    colorA: "#fff",
    colorB: "#242424",
    colorC: "blue-500",
    colorD: "gray-50",
    colorE: "gray-500",
  },
  reducers: {
    selectdark: (state, action) => {
      state.selectedDark = action.payload;
      localStorage.setItem("dark", action.payload);
      if (action.payload === 0) {
        state.colorA = "#ffffff";
        state.colorB = "#272727";
        state.colorC = "#f0f1f3";
      } else if (action.payload === 1) {
        state.colorA = "#1f1f1f";
        state.colorB = "#bfbfbf";
        state.colorC = "#242424";
      }
    },
  },
});

export const { selectdark } = darkMoodSlice.actions;

export default darkMoodSlice.reducer;
