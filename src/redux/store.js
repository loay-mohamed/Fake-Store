import { configureStore } from "@reduxjs/toolkit";
import userResducer from './Slices/UserSlice'
import cartReducer from './Slices/CartSlice'
export const store = configureStore({
  reducer: {
    user: userResducer,
    cart: cartReducer,
  },
});