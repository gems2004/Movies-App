import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDiscoverMoviesQuery } from "../features/movies/moviesSlice";

function MorePage() {
  const { type, page } = useParams();

  let content, isFetching;

  if (type === "discover") {
    content = useDiscoverMoviesQuery(page).data;
  }
  console.log(content);

  return (
    <div className="text-white">
      <Link to={`/${type}/${parseInt(page) + 1}`}>Next</Link>
      <Link to={`/${type}/${parseInt(page) - 1}`}>prev</Link>
    </div>
  );
}

export default MorePage;
