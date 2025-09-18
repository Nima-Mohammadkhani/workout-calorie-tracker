import { configureStore } from "@reduxjs/toolkit";
import exerciseSlice from "./slice/exerciseSlice";
export const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;