import { configureStore } from "@reduxjs/toolkit";
import { aiApi } from "../features/ai/aiApi";

export const store = configureStore({
  reducer: {
    [aiApi.reducerPath]: aiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aiApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
