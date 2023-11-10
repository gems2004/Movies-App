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
      query: ({ id, type }) => `/${type}/${id}?language=en-US`,
    }),
    getPopularMovies: builder.query({
      query: (page) => `/movie/popular?language=en-US&page=${page}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    getUpcomingMovies: builder.query({
      query: (page) => `/movie/upcoming?language=en-US&page=${page}`,
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
      query: (page) => `/tv/popular?language=en-US&page=${page}`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    search: builder.query({
      query: ({ query, pageNum }) =>
        `/search/multi?query=${query}&page=${pageNum}`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    discoverFilter: builder.query({
      query: ({ type, adult, page, releaseYear, sortBy, genre }) =>
        `/discover/${type}?include_adult=${adult}&include_video=false&language=en-US&page=${page}&primary_release_year=${releaseYear}&sort_by=${sortBy}&with_genres=${genre}`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    genreList: builder.query({
      query: (type) => `/genre/${type}/list?language=en`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.genres.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    categories: builder.query({
      query: ({ type, genre, page }) =>
        `/discover/${type}?language=en-US&page=${page}&without_genres=${genre}`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    similar: builder.query({
      query: ({ type, id }) => `/${type}/${id}/similar?language=en-US&page=1`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Show", id })), "Show"]
          : ["Show"],
    }),
    recommended: builder.query({
      query: ({ type, id }) =>
        `/${type}/${id}/recommendations?language=en-US&page=1`,

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
  useSearchQuery,
  useLazyDiscoverFilterQuery,
  useLazyGenreListQuery,
  useCategoriesQuery,
  useSimilarQuery,
  useRecommendedQuery,
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
