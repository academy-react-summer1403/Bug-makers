import { createSlice } from '@reduxjs/toolkit';

const BlogSlice = createSlice({
  name: 'Blog',
  initialState: {
    CourseList: [],
  },
  reducers: {
    setBlogList: (state, action) => {
      state.CourseList = action.payload;
    },
  },
});

export const { setBlogList } = BlogSlice.actions;
export default BlogSlice.reducer;