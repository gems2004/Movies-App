import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi", // default value
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
export const ipApi = createApi({
  reducerPath: "ipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ip-api.com/",
  }),
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: () => `json`,
    }),
  }),
});
export const { useGetLocationQuery } = ipApi;
