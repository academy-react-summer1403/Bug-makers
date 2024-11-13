import { createSlice } from '@reduxjs/toolkit'
export const darkMoodSlice = createSlice({
  name: "darkMood",
  initialState: {
    selectedDark: Number(localStorage.getItem("dark")) || 0,
    bgHigh: "#ffffff",
    bgLow: "#f2f3f5",
    textHigh: "#5e5e5e",
    textLow: "#7e7e7e",
    selectedButton: Number(localStorage.getItem("selectedButton")) || 0,
    color: "blue",
    input:""
  },
  reducers: {
    selectdark: (state, action) => {
      state.selectedDark = action.payload;
      localStorage.setItem("dark", action.payload);
      if (action.payload === 0) {
        state.bgHigh = "#ffffff";
        state.bgLow = "#f2f3f5";
        state.textHigh = "#5e5e5e";
        state.textLow = "#7e7e7e";
        state.input= "";
      } else if (action.payload === 1) {
        state.bgHigh = "#1f1f1f";
        state.bgLow = "#242424";
        state.textHigh = "#bfbfbf";
        state.textLow = "#a3aab3";
        state.input= "dark";
      }
    },
    selectButton: (state, action) => {
      state.selectedButton = action.payload;
      localStorage.setItem("selectedButton", action.payload);
      if (action.payload === 0) {
        state.color = "blue";
      } else if (action.payload === 1) {
        state.color = "green";
      } else if (action.payload === 2) {
        state.color = "yellow";
      }
      else if (action.payload === 3) {
        state.color = "red";
      }
    },
  },
});

export const { selectButton, selectdark } = darkMoodSlice.actions;

export default darkMoodSlice.reducer;
