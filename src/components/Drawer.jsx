import React from "react";
import { Link } from "react-router-dom";

function Drawer({ title, shows, isFetching, isSuccess }) {
  let content;
  if (isFetching) content = <p>Loading...</p>; // Spinner here
  else if (!isFetching && isSuccess) {
    content = shows.results.map((show) => {
      return (
        <div key={show.id}>
          <Link to={`/${show.id}`}>
            <h2>{show.title}</h2>
            <p>{show.release_date}</p>
          </Link>
        </div>
      );
    });
  } else content = <p>Oops! Nothing found</p>;

  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  );
}

export default Drawer;
