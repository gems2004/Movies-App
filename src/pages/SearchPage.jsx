import React from "react";
import { useSearchQuery } from "../features/movies/moviesSlice";
import { useNavigate, useParams } from "react-router-dom";
import List from "../components/List";
import Loader from "../assets/Loader.json";
import Lottie from "lottie-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const { query, page } = useParams();
  const { data: result, isFetching } = useSearchQuery({
    query: query,
    pageNum: page,
  });
  console.log(result);
  function ButtonsLogic() {
    if (page == 1) {
      return (
        <button
          className="bg-red-600 w-32 h-10 rounded-md"
          onClick={() => {
            navigate(`/search/${query}/${Number(page) + 1}`);
            window.scrollTo(0, 0);
          }}
        >
          Next Page
        </button>
      );
    } else if (page == result?.total_pages) {
      return (
        <button
          className="bg-red-600 w-32 h-10 rounded-md"
          onClick={() => {
            navigate(`/search/${query}/${Number(page) - 1}`);
            window.scrollTo(0, 0);
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
              navigate(`/search/${query}/${Number(page) - 1}`);
              window.scrollTo(0, 0);
            }}
          >
            Previous Page
          </button>
          <button
            className="bg-red-600 w-32 h-10 rounded-md"
            onClick={() => {
              navigate(`/search/${query}/${Number(page) + 1}`);
              window.scrollTo(0, 0);
            }}
          >
            Next Page
          </button>
        </>
      );
    }
  }
  if (isFetching) {
    return (
      <div className="grid w-screen h-screen place-content-center">
        <Lottie className="w-48 mix-blend-lighten" animationData={Loader} />
      </div>
    );
  }
  return (
    <div>
      <List results={result?.results} />
      <div className="flex text-white justify-center gap-10">
        {ButtonsLogic()}
      </div>
    </div>
  );
};

export default SearchPage;
