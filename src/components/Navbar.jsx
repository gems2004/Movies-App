import { faLine } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faChevronDown,
  faHamburger,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Logo from "../assets/Logo.png";
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
      navigate(`/search/${actions.searchField}/1`);
    }
  }
  return (
    <div>
      <nav className="bg-[#CF0A0A] rounded-b-xl text-black px-6 py-4 flex justify-end items-center fixed z-50 w-full">
        <Link className="flex-1" to="/">
          <span>
            <img src={Logo} className="w-8 mix-blend-darken" alt="" />
          </span>
        </Link>
        <form className="relative mr-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            autoComplete="false"
            className={`rounded-full text-black bg-[#EEE] h-8 pl-3 outline-none ${
              actions.searchButton
                ? "searchBar w-48 h-8"
                : "searchBarReversed w-8 h-8"
            }`}
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
              actions.searchButton ? "opacity-100 delay-[500ms]" : "opacity-0"
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
          <FontAwesomeIcon
            icon={faBars}
            className="transition-all"
            size="2xl"
            style={
              actions.hamburgerMenu
                ? { rotate: "-90deg", color: "#000000" }
                : { rotate: "0deg", color: "#000000" }
            }
            fixedWidth
          />
        </button>
      </nav>
      <section
        className={`fixed z-40 bg-black transition-all overflow-scroll   ${
          actions.hamburgerMenu ? "h-screen w-screen" : "w-screen h-0 opacity-0"
        } bg-opacity-30`}
      >
        <div
          className={`bg-black  float-right   ${
            actions.hamburgerMenu ? "w-full h-fit pb-10 rounded-xl" : "w-0"
          }`}
        >
          <ul className="list-none text-red-600 z-50 pt-20 flex flex-col items-center gap-6 text-2xl">
            <Categories
              setHamburgerMenu={setActions}
              hamburgerMenu={actions.hamburgerMenu}
            />
            <hr className="border border-red-600 w-80" />
            <li
              onClick={() => {
                navigate(`/discover`);
                actions.hamburgerMenu = false;
              }}
            >
              Discover
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
