import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import productReducer from "./productReducer";
import { categoryReducer } from "./categoryReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer,
  },
});

export const server = "http://192.168.1.3:8080/api/v1";
