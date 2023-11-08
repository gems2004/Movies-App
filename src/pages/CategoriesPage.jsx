import React, { useState } from "react";
import List from "../components/List";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesQuery } from "../features/movies/moviesSlice";

const CategoriesPage = () => {
  const { type, id, page } = useParams();
  const { data } = useCategoriesQuery({ type: type, genre: id, page: page });
  console.log(data);
  const navigate = useNavigate();
  function ButtonsLogic() {
    if (page == 1) {
      return (
        <button
          className="bg-red-600 w-32 h-10 rounded-md"
          onClick={() => {
            navigate(`/categories/${type}/${id}/${Number(page) + 1}`);
            window.scrollTo(0, 0);
          }}
        >
          Next Page
        </button>
      );
    } else if (page == data?.total_pages) {
      return (
        <button
          className="bg-red-600 w-32 h-10 rounded-md"
          onClick={() => {
            navigate(`/categories/${type}/${id}/${Number(page) - 1}`);
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
              navigate(`/categories/${type}/${id}/${Number(page) + 1}`);
              window.scrollTo(0, 0);
            }}
          >
            Next Page
          </button>
          <button
            className="bg-red-600 w-32 h-10 rounded-md"
            onClick={() => {
              navigate(`/categories/${type}/${id}/${Number(page) - 1}`);
              window.scrollTo(0, 0);
            }}
          >
            Previous Page
          </button>
        </>
      );
    }
  }
  return (
    <div>
      <List results={data?.results} />
      <div className="flex text-white justify-center gap-10">
        {ButtonsLogic()}
      </div>
    </div>
  );
};

export default CategoriesPage;
