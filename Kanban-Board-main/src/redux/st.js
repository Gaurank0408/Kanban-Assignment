import { configureStore } from "@reduxjs/toolkit";
import { datact } from "./requiredData";
import { dataSelectSlice } from "./selectData";

export const store = configureStore({
  reducer: {
    datact,
    dataSelectSlice,
  },
});
