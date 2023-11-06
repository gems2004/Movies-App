import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "./moviesSlice";

function MovieInfo() {
  const { id: movieId } = useParams();
  // console.log(movieId);

  const { data: movie, isFetching, isSuccess } = useGetMovieByIdQuery(movieId);
  // console.log(isFetching, movie);

  let content;
  if (isFetching) content = <p>Loading...</p>; //spinner here
  else if (!isFetching && isSuccess) {
    content = (
      <div className="text-white mx-8">
        <div className="mx-auto my-8">
          <h1 className="text-4xl text-red-500 text-center">{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
    );
  } else content = <p>Not Found</p>;
  return content;
}

export default MovieInfo;
