import { faLine } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faHamburger,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [actions, setActions] = useState({
    searchButton: false,
    searchField: "",
    hamburgerMenu: false,
  });
  console.log(actions);
  function searchClickHandler() {
    setActions((prevState) => {
      return {
        ...prevState,
        searchButton: true,
      };
    });
    if (actions.searchField) {
      navigate(`/search/${actions.searchField}`);
    }
  }
  return (
    <div>
      <nav className="bg-black text-red-500 px-6 py-4 flex justify-end items-center fixed z-50 w-full">
        <Link className="flex-1" to="/">
          <h1>Logo</h1>
        </Link>
        <form className="relative mr-4">
          <input
            type="text"
            id="search"
            className={`rounded-full  text-black h-8 pl-3 ${
              actions.searchButton
                ? "searchBar w-48 h-8"
                : "searchBarReversed w-8 h-8"
            }`}
            name="search"
            placeholder="Search"
            onChange={(e) => {
              setActions((prevState) => {
                return {
                  ...prevState,
                  searchField: e.target.value,
                };
              });
            }}
            value={actions.searchField}
          />
          <button
            disabled={actions.searchButton ? false : true}
            className={`absolute right-10 top-1  ${
              actions.searchButton
                ? "opacity-100 delay-[1200ms]"
                : "opacity-0 delay-0"
            } transition-opacity `}
            onClick={() => {
              setActions((prevState) => {
                return {
                  ...prevState,
                  searchButton: false,
                  searchField: "",
                };
              });
            }}
            style={{ color: "#000000" }}
            type="button"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <button
            className={`w-8 h-8 rounded-full absolute right-0 hover:cursor-pointer bg-[#DC5F00]`}
            onClick={searchClickHandler}
            type="button"
          >
            <FontAwesomeIcon icon={faSearch} style={{ color: "#000000" }} />
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            setActions((prevState) => {
              return {
                ...prevState,
                hamburgerMenu: !actions.hamburgerMenu,
              };
            });
          }}
        >
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>
      </nav>
      <section
        className={`fixed z-40 h-screen w-screen bg-black transition-opacity   ${
          actions.hamburgerMenu ? "" : "w-0 h-0 opacity-0"
        } bg-opacity-30`}
      >
        <div
          className={`bg-black h-screen  float-right  ${
            actions.hamburgerMenu ? "w-40" : "w-0"
          }`}
        ></div>
      </section>
    </div>
  );
}

export default Navbar;
