import { configureStore } from '@reduxjs/toolkit';
import customerInfo from '../containers/customerDetails/Reducers/customerInfoSlice';
import userProfileInfo from "../Reducers/userProfileReducer"

export default configureStore({
  reducer: {
    formData:customerInfo,
    userProfileInfo:userProfileInfo
  },
})