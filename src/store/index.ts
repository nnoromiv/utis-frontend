import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import isDataRefreshedReducer from "./refreshSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    isDataRefreshed: isDataRefreshedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
