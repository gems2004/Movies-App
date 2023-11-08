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
                navigate(`/${items.id}`);
              }}
            >
              <div className="w-44">
                <img
                  src={`https://image.tmdb.org/t/p/w500${items.poster_path}`}
                  alt=""
                  className="rounded-xl"
                />
              </div>
              <h2 className="text-center w-44">{items.title || items.name}</h2>
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
