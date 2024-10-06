import { createSlice } from '@reduxjs/toolkit';

const FilterBoxSlice = createSlice({
  name: 'FilterBox',
  initialState: {
    value: false,
  },
  reducers: {
    toggleFilterBox: (state) => {
      state.value = !state.value; 
    },
  },
});

export const { toggleFilterBox } = FilterBoxSlice.actions;
export default FilterBoxSlice.reducer;
