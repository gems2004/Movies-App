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
  } = useGetPopularMoviesQuery({ page: 1, region: ip?.countryCode });
  const {
    data: discoverTv,
    isFetching: isTvFetching,
    isSuccess: isTvSuccess,
  } = useDiscoverTvShowsQuery(1);
  const {
    data: popTv,
    isFetching: isPopTvFetching,
    isSuccess: isPopTvSuccess,
  } = useGetPopularTvShowsQuery({ page: 1, region: ip?.countryCode });

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
      <hr className="border-[#CF0A0A] w-11/12 mx-4" />
      <Drawer
        title={`Popular Movies In ${ip?.country}`}
        type="popular"
        shows={popular}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
      <hr className="border-[#CF0A0A] w-11/12 mx-4" />
      <Drawer
        title="Discover Tv Shows"
        type="discoverTv"
        shows={discoverTv}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
      <hr className="border-[#CF0A0A] w-11/12 mx-4" />
      <Drawer
        title={`Popular Tv Shows In ${ip?.country}`}
        type="popularTv"
        shows={popTv}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
      <hr className="border-[#CF0A0A] w-11/12 mx-4" />
    </div>
  );
}

export default MoviesList;
