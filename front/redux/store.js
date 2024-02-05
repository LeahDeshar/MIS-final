import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import productReducer from "./productReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export const server = "http://192.168.1.4:8080/api/v1";
