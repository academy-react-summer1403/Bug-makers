import { configureStore } from '@reduxjs/toolkit'
import ThemeColorReducer from '../Slice/Theme/Theme'
import CourseSliceReducer from '../Slice/Course/CourseList'
import FilterBoxSliceReducer from '../Slice//FilterBox/FilterBoxSlice'

export const Store = configureStore({
  reducer: {
    themeColor: ThemeColorReducer,
    CourseSlice : CourseSliceReducer,
    FilterBox : FilterBoxSliceReducer,
   },
})