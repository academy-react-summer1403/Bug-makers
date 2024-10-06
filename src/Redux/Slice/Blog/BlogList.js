import { createSlice } from '@reduxjs/toolkit';

const BlogSlice = createSlice({
  name: 'Blog',
  initialState: {
    BlogList: [],
  },
  reducers: {
    setBlogList: (state, action) => {
      state.BlogList = action.payload;
    },
  },
});

export const { setBlogList } = BlogSlice.actions;
export default BlogSlice.reducer;