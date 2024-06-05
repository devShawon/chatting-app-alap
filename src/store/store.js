import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import activeUserSlice from '../slices/activeUserSlice'
import { requestValue } from '../slices/requestSlice'

export const store = configureStore({
  reducer: {
    loginUser: authSlice,
    chatUser: activeUserSlice,
    requestData: requestValue,
  },
})