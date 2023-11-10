import React from "react";
import Loader from "../../assets/Loader.json";
import {
  useDiscoverMoviesQuery,
  useDiscoverTvShowsQuery,
  useGetPopularMoviesQuery,
  useGetPopularTvShowsQuery,
} from "./moviesSlice";
import Drawer from "../../components/Drawer";
import { useGetLocationQuery } from "../api/apiSlice";
import Lottie from "lottie-react";

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
  } = useGetPopularMoviesQuery(1);
  const {
    data: discoverTv,
    isFetching: isTvFetching,
    isSuccess: isTvSuccess,
  } = useDiscoverTvShowsQuery(1);
  const {
    data: popTv,
    isFetching: isPopTvFetching,
    isSuccess: isPopTvSuccess,
  } = useGetPopularTvShowsQuery(1);
  if (!isSuccess || !isPopSuccess || !isPopTvSuccess || !isTvSuccess) {
    return (
      <div className="grid w-screen h-screen place-content-center">
        <Lottie className="w-48 mix-blend-lighten" animationData={Loader} />
      </div>
    );
  }
  return (
    <div className="pt-16 lg:px-20 lg:pr-[16.5rem]">
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
        title={`Popular Movies`}
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
        title={`Popular Tv Shows`}
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
