import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-red-500 px-6 py-4 flex justify-between items-center">
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <form>
        <input type="text" id="search" name="search" placeholder="Search" />
        <button disabled>Search</button> {/* should be replaced by icon */}
      </form>
    </nav>
  );
}

export default Navbar;
