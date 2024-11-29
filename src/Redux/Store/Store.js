import { configureStore } from '@reduxjs/toolkit'
import ThemeColorReducer from '../Slice/Theme/Theme'
import CourseSliceReducer from '../Slice/Course/CourseList'
import BlogSliceReducer from '../Slice/Blog/BlogList'
import ClientInfoSliceReducer from '../Slice/ClientInfo/ClientInfo'
import LoginTokenSliceReducer from "../Slice/Login/Login";
import towStepSliceReducer from '../Slice/Login/TowStep'
import favoriteeSliceReducer from '../Slice/Course/favoritee'
import paymentSliceReducer from '../Slice/payment/payment'
import darkMoodReducer from '../Slice/darkMood/darkMood'
import helpSliceReducer from '../Slice/helpchat/helpChat'
import VoiceSliceReducer from '../Slice/voicecommand/voiceSlice'

export const Store = configureStore({
  reducer: {
    
    darkMood: darkMoodReducer,
    CourseSlice: CourseSliceReducer,
    BlogSlice: BlogSliceReducer,
    ClientInfoSlice: ClientInfoSliceReducer,
    LoginToken: LoginTokenSliceReducer,
    ToStep: towStepSliceReducer,
    favorite: favoriteeSliceReducer,
    payment: paymentSliceReducer,
    help: helpSliceReducer,
    themeColor: ThemeColorReducer,
    voice : VoiceSliceReducer
  },
});
