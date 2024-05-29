import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const cancelReqSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    cancelReqData: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { cancelReqData } = cancelReqSlice.actions

export default cancelReqSlice.reducer