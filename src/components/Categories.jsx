import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useLazyGenreListQuery } from "../features/movies/moviesSlice";
import { useNavigate } from "react-router-dom";

const Categories = ({ setHamburgerMenu, hamburgerMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedMovies, setIsExpandedMovies] = useState(false);
  const [isExpandedTvShows, setIsExpandedTvShows] = useState(false);
  const [triggerMovie, { data: movie, isLoading: movieLoader }] =
    useLazyGenreListQuery();
  const [triggerTv, { data: tv, isLoading: tvLoader }] =
    useLazyGenreListQuery();
  const navigate = useNavigate();
  return (
    <>
      <li className="flex flex-col items-center gap-1 hover:cursor-pointer">
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <span>Categories</span>
          <span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-all ${isExpanded ? "rotate-180" : ""}`}
            />
          </span>
        </div>
        {isExpanded ? (
          <ul className="text-center flex flex-col gap-2">
            <hr className="border-red-600 border" />
            <li
              onClick={() => {
                setIsExpandedMovies(!isExpandedMovies);
                triggerMovie("movie");
              }}
              className="flex flex-col items-center"
            >
              <div>
                <span>Movies</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-all ${
                    isExpandedMovies ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isExpandedMovies ? (
                movieLoader ? (
                  <span class="loader"></span>
                ) : (
                  movie?.genres.map((item) => {
                    return (
                      <li
                        onClick={() => {
                          navigate(`/categories/movie/${item.id}/1`);
                          setHamburgerMenu((prevState) => {
                            return {
                              ...prevState,
                              hamburgerMenu: !hamburgerMenu,
                            };
                          });
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </li>
                    );
                  })
                )
              ) : undefined}
            </li>
            <li
              onClick={() => {
                setIsExpandedTvShows(!isExpandedTvShows);
                triggerTv("tv");
              }}
            >
              <div>
                <span>Tv Shows</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-all ${
                    isExpandedTvShows ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isExpandedTvShows ? (
                tvLoader ? (
                  <span class="loader"></span>
                ) : (
                  tv?.genres.map((item) => {
                    return (
                      <li
                        onClick={() => {
                          navigate(`/categories/tv/${item.id}/1`);
                          setHamburgerMenu((prevState) => {
                            return {
                              ...prevState,
                              hamburgerMenu: !hamburgerMenu,
                            };
                          });
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </li>
                    );
                  })
                )
              ) : undefined}
            </li>
          </ul>
        ) : undefined}
      </li>
    </>
  );
};

export default Categories;
