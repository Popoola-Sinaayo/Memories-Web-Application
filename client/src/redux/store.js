import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/postsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
