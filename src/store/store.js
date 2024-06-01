import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import activeUserSlice from '../slices/activeUserSlice'

export const store = configureStore({
  reducer: {
    loginUser: authSlice,
    chatUser: activeUserSlice,
  },
})