import React from "react";
import {
  selectAllData,
  selectAllMovies,
  useDiscoverMoviesQuery,
  useDiscoverTvShowsQuery,
  useGetPopularMoviesQuery,
  usePopularTvShowsQuery,
} from "./moviesSlice";
import Drawer from "../../components/Drawer";
import { useSelector } from "react-redux";
import { useGetLocationQuery } from "../api/apiSlice";

function MoviesList() {
  const { data: movies, isFetching, isSuccess } = useDiscoverMoviesQuery(1);
  const { data: ip } = useGetLocationQuery();
  console.log(ip);
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
  } = usePopularTvShowsQuery(1, ip?.countryCode);

  return (
    <div className="pt-16">
      <Drawer
        title="Discover Movies"
        type="discover"
        shows={movies}
        isFetching={isFetching}
        isSuccess={isSuccess}
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
        type="discover"
        shows={discoverTv}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
      <Drawer
        title={`Popular Tv Shows In ${ip?.country}`}
        type="popular"
        shows={popTv}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
    </div>
  );
}

export default MoviesList;
