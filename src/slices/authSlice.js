import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')) : null,
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    userValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userValue } = authSlice.actions

export default authSlice.reducer