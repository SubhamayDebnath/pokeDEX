import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import LogoImage from "../assets/logo.png";
function Navbar() {
  return (
    <nav className="max-w-screen-xl w-full mx-auto flex items-center justify-center py-5 lg:px-12 md:px-8 px-4">
      <Link to={"/"} className="flex items-center gap-2 sm:text-3xl text-4xl font-bold text-white">
      <img
          src={LogoImage}
          alt="Logo"
          className="sm:h-8 h-10 aspect-square object-contain"
      />
        PokeDEX
      </Link>
    </nav>
  );
}

export default Navbar;
