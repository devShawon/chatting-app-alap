import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    
    requestValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { requestValue } = requestSlice.actions 

export default requestSlice.reducer