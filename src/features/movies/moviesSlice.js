import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const moviesAdapter = createEntityAdapter({});

const initialState = moviesAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    discoverMovies: builder.query({
      query: (adult, language, sort) =>
        `/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`,
      providesTags: (result, error, args) => console.log(result),
      // [
      //   "Show",
      //   ...result.map(({ id }) => ({ type: "Show", id })),
      // ],
      providesTags: (result, error, arg) => [
        { type: "Show", id: "LIST" },
        ...result.ids?.map((id) => ({ type: "Show", id })),
      ],
    }),
  }),
});
export const { useDiscoverMoviesQuery } = extendedApiSlice;

export const selectMoviesResult =
  extendedApiSlice.endpoints.discoverMovies.select();

const selectMoviesData = createSelector(
  selectMoviesResult,
  (moviesResult) => moviesResult.data
);

export const { selectAll: selectAllMovies } = moviesAdapter.getSelectors(
  (state) => selectMoviesData(state) ?? initialState
);

export const { selectAll: selectAllData } = moviesAdapter.getSelectors(
  (state) => state
);
