import React, { useEffect, useState } from "react";
import List from "../components/List";
import {
  useLazyDiscoverFilterQuery,
  useLazyGenreListQuery,
} from "../features/movies/moviesSlice";
import Lottie from "lottie-react";
import Loader from "../assets/Loader.json";
const DiscoverPage = () => {
  const [filter, setFilter] = useState({
    type: "",
    adult: false,
    page: 1,
    releaseYear: "",
    sortType: "",
    sortBy: "",
    genre: "",
  });
  console.log(filter);
  function nextPage() {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: filter.page + 1,
      };
    });
  }
  function prevPage() {
    setFilter((prevState) => {
      return {
        ...prevState,
        page: filter.page - 1,
      };
    });
  }
  const sortAsc = (
    <>
      <option value="popularity.asc">Popularity</option>
      <option value="revenue.asc">Revenue</option>
      <option value="vote_average.asc">Vote Average</option>
      <option value="vote_count.asc">Vote Count</option>
    </>
  );
  const sortDesc = (
    <>
      <option value="popularity.desc">Popularity</option>
      <option value="revenue.desc">Revenue</option>
      <option value="vote_average.desc">Vote Average</option>
      <option value="vote_count.desc">Vote Count</option>
    </>
  );
  const date = new Date();
  const [triggerGenre, { data: genreList, isLoading: genreLoading }] =
    useLazyGenreListQuery();
  const [
    triggerSearch,
    { data: discoverByFilter, isSuccess: searchSuccess, isFetching },
  ] = useLazyDiscoverFilterQuery();
  console.log(discoverByFilter);
  useEffect(() => {
    if (filter.type == "movie" || filter.type == "tv") {
      triggerGenre(filter.type);
    }
  }, [filter.type]);
  function ButtonsLogic() {
    if (filter.page == 1) {
      return (
        <button
          className="bg-red-600 w-32 h-10 rounded-md"
          onClick={() => {
            window.scrollTo(0, 0);
            nextPage();
          }}
        >
          Next Page
        </button>
      );
    } else if (filter.page == discoverByFilter?.total_pages) {
      return (
        <button
          className="bg-red-600 w-32 h-10 rounded-md"
          onClick={() => {
            window.scrollTo(0, 0);
            prevPage();
          }}
        >
          Previous Page
        </button>
      );
    } else {
      return (
        <>
          <button
            className="bg-red-600 w-32 h-10 rounded-md"
            onClick={() => {
              window.scrollTo(0, 0);
              prevPage();
            }}
          >
            Previous Page
          </button>
          <button
            className="bg-red-600 w-32 h-10 rounded-md"
            onClick={() => {
              window.scrollTo(0, 0);
              nextPage();
            }}
          >
            Next Page
          </button>
        </>
      );
    }
  }
  useEffect(() => {
    triggerSearch({
      type: filter.type,
      adult: filter.adult,
      page: filter.page,
      releaseYear: filter.releaseYear,
      sortBy: filter.sortBy,
      genre: filter.genre,
    });
  }, [filter.page]);

  return (
    <div className="pt-20 flex flex-col items-center">
      <form
        onClick={(e) => e.preventDefault()}
        onChange={(e) => {
          setFilter((prevState) => {
            return {
              ...prevState,
              [e.target.name]: e.target.value,
            };
          });
        }}
        className="flex flex-col w-5/6 items-center gap-2"
      >
        <select name="type" id="" className="rounded-md" value={filter.type}>
          <option hidden>Type</option>
          <option value="movie">Movies</option>
          <option value="tv">Tv Shows</option>
        </select>
        <select name="genre" id="" className="rounded-md">
          {genreLoading ? (
            <option>Please Wait</option>
          ) : filter?.type == "movie" ? (
            genreList?.genres.map((item) => {
              return <option value={item?.id}>{item?.name}</option>;
            })
          ) : filter?.type == "tv" ? (
            genreList?.genres.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })
          ) : (
            <option>Please Choose A Type</option>
          )}
        </select>
        <div className="w-2/3 flex gap-2 items-center">
          <label htmlFor="releaseYear" className="text-white text-xs">
            Release Year
          </label>
          <input
            type="number"
            min={1900}
            max={date.getFullYear()}
            name="releaseYear"
            value={filter.releaseYear}
            id="releaseYear"
            className="rounded-md w-32"
          />
        </div>
        <select name="sortType" className="rounded-md" value={filter.sortType}>
          <option value="">Sort Type</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
        <select name="sortBy" className="rounded-md" value={filter.sortBy}>
          {filter.sortType == "Ascending" ? (
            sortAsc
          ) : filter.sortType == "Descending" ? (
            sortDesc
          ) : (
            <option>Please Select SortType</option>
          )}
        </select>
        <div
          className="flex gap-2"
          onClick={() => {
            setFilter((prevState) => {
              return {
                ...prevState,
                adult: !filter.adult,
              };
            });
          }}
          s
        >
          <label htmlFor="adult" className="text-white">
            Adult
          </label>
          <input
            type="checkbox"
            name="adult"
            id="adult"
            checked={filter.adult}
          />
        </div>
        <button
          type="button"
          className="bg-red-600 text-white rounded-md p-1 px-8"
          onClick={() =>
            triggerSearch({
              type: filter.type,
              adult: filter.adult,
              page: filter.page,
              releaseYear: filter.releaseYear,
              sortBy: filter.sortBy,
              genre: filter.genre,
            })
          }
        >
          Search
        </button>
      </form>
      <div>
        {searchSuccess && !isFetching ? (
          <>
            <List results={discoverByFilter.results} />
            <div className="flex text-white justify-center gap-10">
              {ButtonsLogic()}
            </div>
          </>
        ) : (
          <div className="grid place-content-center h-96">
            <Lottie className="w-48 mix-blend-lighten" animationData={Loader} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
