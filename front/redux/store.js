import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import productReducer, { allProductReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer,
    allProducts: allProductReducer,
  },
});

export const server = "http://192.168.0.133:8080/api/v1";
