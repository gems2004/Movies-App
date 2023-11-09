import React from "react";
import { useNavigate } from "react-router-dom";

const List = (results) => {
  const navigate = useNavigate();

  if (results.results) {
    return (
      <div className="flex flex-col text-white items-center pt-20">
        {results.results.map((items) => {
          return (
            <div
              key={items.id}
              className="my-2"
              onClick={() => {
                navigate(
                  `/${items.first_air_date ? "tv" : "movie"}/${items.id}`
                );
              }}
            >
              <div className="w-[176px] h-[264px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${items.poster_path}`}
                  alt=""
                  className="rounded-xl"
                />
              </div>
              <div className="my-2">
                <h2 className="text-center w-44">
                  {items.title || items.name}
                </h2>
                <h2 className="text-center w-44">
                  {items.release_date || items.first_air_date}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    <div>loading...</div>;
  }
};

export default List;
