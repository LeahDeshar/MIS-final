import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export const server = "http://192.168.204.1:8080/api/v1";
