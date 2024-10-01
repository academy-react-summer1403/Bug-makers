import { configureStore } from '@reduxjs/toolkit'
import ThemeColorReducer from '../Slice/Theme/Theme'

export const Store = configureStore({
  reducer: {
    themeColor: ThemeColorReducer,
   },
})