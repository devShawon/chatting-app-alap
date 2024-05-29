import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import cancelReqSlice from '../slices/cancelReqSlice'

export const store = configureStore({
  reducer: {
    loginUser: authSlice,
    reqCancel: cancelReqSlice,
  },
})