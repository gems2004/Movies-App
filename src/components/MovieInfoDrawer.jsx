import React from "react";

const MovieInfoDrawer = ({ results, title }) => {
  console.log(results);
  return (
    <div className="flex flex-col mx-4 gap-3">
      <span className="text-2xl text-red-600">{title}</span>
      <div className="flex gap-4">
        {results?.map((item) => {
          return (
            <div className="flex flex-col text-center gap-2">
              <div className="w-[176px] h-[264px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt=""
                  className="rounded-2xl"
                />
              </div>
              <h2>{item.title || item.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieInfoDrawer;
