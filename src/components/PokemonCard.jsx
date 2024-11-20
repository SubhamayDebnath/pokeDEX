import React from "react";
import { Link } from "react-router-dom";

function PokemonCard({ id,name, image, type }) {
  return (
    <Link to={`/pokemon/${id}`} className="group flex flex-col items-center justify-center p-4 gap-4 rounded transition-all duration-300 ease-in-out hover:-translate-y-6 hover:bg-white/5 border border-transparent hover:border-white/10 drop-shadow-[7px_12px_7px_rgba(0,0,0,.25)] hover:drop-shadow-[0_0px_25px_rgba(255,255,255,0.25)]">
      <img
        src={image}
        alt={name}
        className="sm:w-3/4 mx-auto aspect-square object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      <h1 className="text-xl font-semibold capitalize text-white opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
        {name}
      </h1>
    </Link>
  );
}

export default PokemonCard;
