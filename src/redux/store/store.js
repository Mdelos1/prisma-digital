import { configureStore } from "@reduxjs/toolkit";
import { glocersReducer } from "../reducers/glocersReducer";
import { userReducer } from "../reducers/userReducer";
const reducer = {
  userStore: userReducer, 
  glocerStore: glocersReducer 
};
const store = configureStore({
  reducer,
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
