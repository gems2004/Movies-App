import React from "react";
import { Link } from "react-router-dom";

function Drawer({ title, type, shows, isFetching, isSuccess }) {
  let content;
  if (isFetching) content = <p>Loading...</p>; // Spinner here
  else if (!isFetching && isSuccess) {
    content = shows.results.map((show) => {
      return (
        <div key={show.id}>
          <Link
            to={`/${show.id}`}
            className="flex flex-col justify-around items-center min-w-[100px] min-h-[150px]"
          >
            <h2>{show.title}</h2>
            <p>{show.release_date}</p>
          </Link>
        </div>
      );
    });
  } else content = <p>Oops! Nothing found</p>;

  return (
    <div className="text-white">
      <h1 className="font-extrabold text-2xl pt-4">
        {title}:
        <span className="text-base pl-2 text-red-600 underline">
          <Link to={`/${type}/1`}>more</Link>
        </span>
      </h1>
      <div className="flex overflow-y-scroll">{content}</div>
    </div>
  );
}

export default Drawer;
