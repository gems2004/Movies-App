import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // default value
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_MOVIES_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${process.env.VITE_MOVIES_API_KEY}`);
    },
  }),
  tagTypes: ["Show"],
  endpoints: (builder) => ({}),
});
