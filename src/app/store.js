import { configureStore } from "@reduxjs/toolkit";
import { ipApi, movieApi } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [ipApi.reducerPath]: ipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware, ipApi.middleware),
});
