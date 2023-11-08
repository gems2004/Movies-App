import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useRecommendedQuery,
  useSimilarQuery,
} from "./moviesSlice";
import Drawer from "../../components/Drawer";

function MovieInfo() {
  const { type: showType, id: movieId } = useParams();
  // console.log(movieId);

  const { data: movie, isFetching, isSuccess } = useGetMovieByIdQuery(movieId);
  const {
    data: similar,
    isFetching: similarFetching,
    isSuccess: similarSuccess,
    isLoading: similarLoading,
  } = useSimilarQuery({ type: showType, id: movieId });
  const { data: recommended } = useRecommendedQuery({
    type: showType,
    id: movieId,
  });
  const navigate = useNavigate();
  // console.log(isFetching, movie);

  let content;
  if (isFetching) content = <p>Loading...</p>; //spinner here
  else if (!isFetching && isSuccess) {
    content = (
      <div className="text-white  mx-8 pt-14">
        <div className="mx-auto py-8 flex flex-col items-center">
          <div className="w-2/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              className="rounded-md border-4 border-black"
            />
          </div>
          <h1 className="text-4xl text-red-500 text-center">{movie.title}</h1>
          <div className="flex gap-4">
            {movie.genres.map((item) => {
              return (
                <li
                  key={item.id}
                  className="list-none bg-black rounded-full p-2 my-2"
                  onClick={() => {
                    navigate(`/categories/${showType}/${item.id}/1`);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </div>
          <p className="text-center mb-2">{movie.overview}</p>
          <hr className="w-11/12 border-red-600" />

          <span>Budget: {movie.budget.toLocaleString("en-US")} $</span>
          <span>Revenue: {movie.revenue.toLocaleString("en-US")} $</span>

          <hr className="w-11/12 border-red-600" />
          <div className="bg-white w-screen h-fit p-2 overflow-scroll my-4">
            <div className="flex justify-center items-center gap-4">
              {movie.production_companies.map((item) => {
                if (item.logo_path) {
                  return (
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                        alt=""
                        className="w-32"
                      />
                    </div>
                  );
                } else {
                  return (
                    <span className="text-black font-bold">{item.name}</span>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else content = <p>Not Found</p>;
  return content;
}

export default MovieInfo;
