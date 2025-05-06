/* eslint-disable @typescript-eslint/no-explicit-any */
import userServices from "@/services/auth.services";
import { AuthState } from "@/types/AuthType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { env } from "@/config/env";
import { Buffer } from "buffer";

export const fetchLoginAsync = createAsyncThunk(
  "user/fetchLogin",
  async ({
    username = "",
    password = "",
  }: {
    username: string;
    password: string;
  }) => {
    console.log(username, password);

    const response = await userServices.fetchLogin(username, password);
    return response;
  }
);

const initialState: AuthState = {
  token: "",
  role: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
      const decoded: any = jwtDecode(action.payload.data.token);

      const decodedData = JSON.parse(
        Buffer.from(decoded.___, "base64").toString("utf8")
      );
      state.token = action.payload.data.token;
      state.role = decodedData.token;
      state.loading = false;
    });
    builder.addCase(fetchLoginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoginAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
