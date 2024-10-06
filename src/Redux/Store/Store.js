import { configureStore } from '@reduxjs/toolkit'
import ThemeColorReducer from '../Slice/Theme/Theme'
import CourseSliceReducer from '../Slice/Course/CourseList'

export const Store = configureStore({
  reducer: {
    themeColor: ThemeColorReducer,
    CourseSlice : CourseSliceReducer,
    CourseSlice : CourseSliceReducer,
   },
})