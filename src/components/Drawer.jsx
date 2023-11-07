import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Drawer({ title, type, shows, isFetching, isSuccess }) {
  const ref = useRef(null);
  function scroller(scrollOffset) {
    ref.current.scrollLeft += scrollOffset;
  }
  let content;
  if (isFetching) content = <p>Loading...</p>; // Spinner here
  else if (!isFetching && isSuccess) {
    content = shows.results.map((show) => {
      return (
        <div key={show.id} className="mr-4">
          <Link
            to={`/${show.id}`}
            className="flex flex-col justify-around items-center min-w-[100px] min-h-[150px]"
          >
            <div className="w-44">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="text-center">
              <h2>{show.title || show.name}</h2>
              <p>{show.release_date || show.first_air_date}</p>
            </div>
          </Link>
        </div>
      );
    });
  } else content = <p>Oops! Nothing found</p>;

  return (
    <div className="text-white px-4">
      <h1 className="font-extrabold text-2xl pt-4">
        {title}:
        <span className="text-base pl-2 text-red-600 underline">
          <Link to={`/${type}/1`}>more</Link>
        </span>
      </h1>
      <div
        className="flex overflow-x-scroll relative scroll-smooth no-scrollbar"
        ref={ref}
      >
        {content}
        <div className="mt-28">
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ color: "#dc2626" }}
            size="4x"
          />
          <div className="w-20 text-[11px] text-red-600">Load More</div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
