import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './slice/authSlice'
import { userSlide } from './slice/userSlice'

export const store = configureStore({
        reducer:{
                userAuth: authSlice.reducer,
                user: userSlide.reducer
        }
})

