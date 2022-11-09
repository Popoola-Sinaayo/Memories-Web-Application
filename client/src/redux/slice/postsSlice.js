import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuthStatus = async () => {
  const response = await axios.get("http://localhost:5000/user/auth");
  return response.data.authorized;
};

const initialState = {
  authStatus: "",
  status: "",
  error: "",
};


export const fetchPosts = createAsyncThunk("getUserAuthStatus", async () => {
  const response = await axios.get("http://localhost:5000/user/auth");
  return response.data.authorized;
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: [],
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.authStatus = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
