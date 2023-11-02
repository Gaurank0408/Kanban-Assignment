import { createReducer } from "@reduxjs/toolkit";

export const dataSelectSlice = createReducer(
  {},
  {
    dataSelectRequest: (state) => {
      state.load = true;
      state.dataSel = [];
    },
    dataSelectSuccess: (state, action) => {
      state.load = false;
      state.dataSel = action.payload.dataSel;
      state.user = action.payload.user;
    },
    dataSelectFailure: (state, action) => {
      state.load = false;
      state.dataSel = [];
      state.message = action.payload.message;
    },
  }
);
