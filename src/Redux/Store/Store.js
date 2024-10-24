import { configureStore } from '@reduxjs/toolkit'
import ThemeColorReducer from '../Slice/Theme/Theme'
import CourseSliceReducer from '../Slice/Course/CourseList'
import BlogSliceReducer from '../Slice/Blog/BlogList'
import LoginTokenSliceReducer from '../Slice/Login/Login'

export const Store = configureStore({
  reducer: {
    themeColor: ThemeColorReducer,
    CourseSlice : CourseSliceReducer,
    BlogSlice : BlogSliceReducer,
    LoginToken : LoginTokenSliceReducer
   },
})