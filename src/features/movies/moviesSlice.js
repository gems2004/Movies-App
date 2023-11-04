import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const moviesAdapter = createEntityAdapter({});

const initialState = moviesAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    discoverMovies: builder.query({
      query: (adult, language, sort) =>
        `/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
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
