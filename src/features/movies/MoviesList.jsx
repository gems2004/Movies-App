import React from "react";
import {
  useDiscoverMoviesQuery,
  useDiscoverTvShowsQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvShowsQuery,
} from "./moviesSlice";
import Drawer from "../../components/Drawer";
import { useGetLocationQuery } from "../api/apiSlice";

function MoviesList() {
  const { data: ip } = useGetLocationQuery();

  const {
    data: movies,
    isFetching,
    isSuccess,
    isLoading,
  } = useDiscoverMoviesQuery(1);
  const {
    data: popular,
    isFetching: isPopFetching,
    isSuccess: isPopSuccess,
  } = useGetPopularMoviesQuery(1, ip?.countryCode);
  const {
    data: discoverTv,
    isFetching: isTvFetching,
    isSuccess: isTvSuccess,
  } = useDiscoverTvShowsQuery(1);
  const {
    data: popTv,
    isFetching: isPopTvFetching,
    isSuccess: isPopTvSuccess,
  } = useGetPopularTvShowsQuery(1, ip?.countryCode);

  return (
    <div className="pt-16">
      <Drawer
        title="Discover Movies"
        type="discover"
        shows={movies}
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
      <Drawer
        title={`Popular Movies In ${ip?.country}`}
        type="popular"
        shows={popular}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
      <Drawer
        title="Discover Tv Shows"
        type="discoverTv"
        shows={discoverTv}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
      <Drawer
        title={`Popular Tv Shows In ${ip?.country}`}
        type="popularTv"
        shows={popTv}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
    </div>
  );
}

export default MoviesList;
