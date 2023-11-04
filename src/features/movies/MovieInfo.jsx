import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "./moviesSlice";

function MovieInfo() {
  const { id: movieId } = useParams();
  console.log(movieId);

  const { data: movie, isFetching, isSuccess } = useGetMovieByIdQuery(movieId);
  console.log(isFetching, movie);

  let content;
  if (isFetching) content = <p>Loading...</p>; //spinner here
  else if (!isFetching && isSuccess) {
    content = (
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    );
  } else content = <p>Not Found</p>;
  return content;
}

export default MovieInfo;
