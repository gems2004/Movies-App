import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // default value
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGM3Mjc2MWNjMjMyNTMwYmNhNDYzMWJmMTQzNjQ4YSIsInN1YiI6IjY0ZTc3NzZhMDZmOTg0MDEwYzZmMDM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WRVHcYKuxXxv_dqZQsPop6v0ZV1CnUsJ_pI9-2Z-TUs`
      );
    },
  }),
  tagTypes: ["Show"],
  endpoints: (builder) => ({}),
});
