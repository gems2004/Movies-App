import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { movieApi } from "../api/apiSlice";

const moviesAdapter = createEntityAdapter({});

const initialState = moviesAdapter.getInitialState();

export const extendedApiSlice = movieApi.injectEndpoints({
  endpoints: (builder) => ({
    discoverMovies: builder.query({
      query: (page) =>
        `/discover/movie?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    getMovieById: builder.query({
      query: (id) => `/movie/${id}?language=en-US`,
    }),
    getPopularMovies: builder.query({
      query: (page, region) =>
        `/movie/popular?language=en-US&page=${page}&region=${region}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    getUpcomingMovies: builder.query({
      query: () => `/movie/upcoming?language=en-US&page=${page}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    discoverTvShows: builder.query({
      query: (page) =>
        `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    getPopularTvShows: builder.query({
      query: (page, region) =>
        `/tv/popular?language=en-US&page=${page}&region=${region}`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
  }),
});
export const {
  useDiscoverMoviesQuery,
  useGetMovieByIdQuery,
  useGetPopularMoviesQuery,
  useGetUpcomingMoviesQuery,
  useDiscoverTvShowsQuery,
  useGetPopularTvShowsQuery,
} = extendedApiSlice;

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
