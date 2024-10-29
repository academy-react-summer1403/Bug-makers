import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'Course',
  initialState: {
    favoriteList: [],
  },
  reducers: {
    setFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
    },
  },
});

export const { setFavoriteList } = favoriteSlice.actions;
export default favoriteSlice.reducer;