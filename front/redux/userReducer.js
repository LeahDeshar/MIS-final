import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { token: null, profile: null, error: null },
  (builder) => {
    // LOGIN CASE
    builder.addCase("loginRequest", (state, action) => {
      state.loading = true;
    });
    builder.addCase("loginSuccess", (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
      console.log("reducer", state.msg);
      state.isAuth = true;
      state.token = action.payload.token;
    });
    builder.addCase("loginFail", (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
    // ERROR MESSAGE CASE
    builder.addCase("clearError", (state) => {
      state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
      state.msg = null;
    });
    //REGISTER
    builder.addCase("registerRequest", (state, action) => {
      state.loading = true;
    });
    builder.addCase("registerSucess", (state, action) => {
      state.loading = false;
      // state.isAuth = true;
      state.msg = action.payload;
    });
    builder.addCase("registerFail", (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
    //  GET USER DATA
    builder.addCase("getUserDataRequest", (state, action) => {
      console.log("load");
      state.loading = true;
    });
    builder.addCase("getUserDataSucess", (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.profile = action.payload;
    });
    builder.addCase("getUserDataFail", (state, action) => {
      console.log("picked");
      state.isAuth = false;
      state.error = action.payload;
    });
    // LOGOUT
    builder.addCase("logoutRequest", (state, action) => {
      state.loading = true;
    });
    builder.addCase("logoutSucess", (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
      state.msg = action.payload;
    });
    builder.addCase("logoutFail", (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
  }
);
