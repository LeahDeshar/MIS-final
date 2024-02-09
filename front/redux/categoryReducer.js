import { createReducer } from "@reduxjs/toolkit";

export const categoryReducer = createReducer(
  { category: null, error: null },
  (builder) => {
    //  GET USER DATA
    builder.addCase("getCategoryDataRequest", (state, action) => {
      console.log("load category");
      state.loading = true;
    });
    builder.addCase("getCategoryDataSuccess", (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.category = action.payload;
    });
    builder.addCase("getCategoryDataFail", (state, action) => {
      console.log("picked category");
      state.isAuth = false;
      state.error = action.payload;
    });
  }
);
