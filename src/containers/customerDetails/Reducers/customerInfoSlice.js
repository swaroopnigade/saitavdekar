import { createSlice } from '@reduxjs/toolkit'

export const customerInfoSlice = createSlice({
  name: 'customerInfo',
  initialState: {
    formData: null,
  },
  reducers: {
    saveCustomerInfo: (state, action) => {
      state.formData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveCustomerInfo } = customerInfoSlice.actions

export default customerInfoSlice.reducer