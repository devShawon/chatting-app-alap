import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const activeUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    msgUserValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { msgUserValue } = activeUserSlice.actions

export default activeUserSlice.reducer