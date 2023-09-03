import { createSlice } from '@reduxjs/toolkit'

export const userProfileInfoSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userData: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userProfileInfoSlice.actions;

export default userProfileInfoSlice.reducer