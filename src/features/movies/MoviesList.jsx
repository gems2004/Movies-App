import React from "react";
import {
  selectAllData,
  selectAllMovies,
  useDiscoverMoviesQuery,
  useGetPopularMoviesQuery,
} from "./moviesSlice";
import Drawer from "../../components/Drawer";
import { useSelector } from "react-redux";

function MoviesList() {
  const { data: movies, isFetching, isSuccess } = useDiscoverMoviesQuery(1);

  const {
    data: popular,
    isFetching: isPopFetching,
    isSuccess: isPopSuccess,
  } = useGetPopularMoviesQuery();

  console.log(movies);
  console.log(false, popular);

  return (
    <div>
      <Drawer
        title="Discover Movies"
        type="discover"
        shows={movies}
        isFetching={isFetching}
        isSuccess={isSuccess}
      />
      <Drawer
        title="Popular Movies"
        type="popular"
        shows={popular}
        isFetching={isPopFetching}
        isSuccess={isPopSuccess}
      />
    </div>
  );
}

export default MoviesList;
