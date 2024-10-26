import { configureStore } from '@reduxjs/toolkit'
import ThemeColorReducer from '../Slice/Theme/Theme'
import CourseSliceReducer from '../Slice/Course/CourseList'
import BlogSliceReducer from '../Slice/Blog/BlogList'
import LoginTokenSliceReducer from '../Slice/Login/Login'
import towStepSliceReducer from '../Slice/Login/TowStep'

export const Store = configureStore({
  reducer: {
    themeColor: ThemeColorReducer,
    CourseSlice : CourseSliceReducer,
    BlogSlice : BlogSliceReducer,
    LoginToken : LoginTokenSliceReducer,
    ToStep: towStepSliceReducer ,

   },
})