import { configureStore } from "@reduxjs/toolkit"
import authSlice  from "./reducers/AuthReducers"
export const store = configureStore({
  reducer: {
    auth: authSlice
  },
})