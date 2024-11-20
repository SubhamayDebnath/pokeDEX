import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Pokemon() {
  let { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const pokemonDetails = async () => {
    setLoading(true);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    setPokemon({
      name: response.data.name,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((type) => type.type.name),
      image: response.data.sprites.other.dream_world.front_default,
    });
    console.log(pokemon);
    setLoading(false);
  };

  useEffect(() => {
    pokemonDetails();
  }, [id]);
  return (
    <>
      <main className="w-dvw min-h-dvh relative flex flex-col backdrop-blur-3xl">
        <Navbar />
        <div>
          {loading ? (
            <div className="h-[50dvh] flex items-center justify-center">
              <div
                className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-[60dvh] max-w-screen-xl mx-auto flex flex-col  gap-10 items-center justify-center lg:px-12 md:px-8 px-4 md:my-5 my-10">
                <div className="relative sm:border sm:border-white/10 h-full aspect-square rounded-full md:p-20 sm:p-10 p-0">
                  <div className="sm:border sm:border-white/10 h-full aspect-square rounded-full md:p-20 sm:p-10 p-0">
                    <div className="max-w-[15rem] w-full mx-auto aspect-square transition-all duration-300 ease-in-out group drop-shadow-[7px_12px_7px_rgba(0,0,0,.25)] hover:drop-shadow-[0_0px_25px_rgba(255,255,255,0.25)]">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="hidden sm:block p-4 border border-white/30 rounded bg-white/20 absolute top-20 -left-16">
                    <p className="text-white capitalize">
                      Name : {pokemon.name}
                    </p>
                  </div>
                  <div className="hidden sm:block p-4 border border-white/30 rounded bg-white/20 absolute bottom-24 -left-16">
                    <p className="text-white">Weight : {pokemon.weight}</p>
                  </div>
                  <div className="hidden sm:block p-4 border border-white/30 rounded bg-white/20 absolute top-20 -right-16 ">
                    <p className="text-white">Height : {pokemon.height}</p>
                  </div>
                  <div className="hidden sm:block p-4 border border-white/30 rounded bg-white/20 absolute bottom-24 -right-16">
                    <p className="text-white capitalize">
                      Type : {pokemon.types}
                    </p>
                  </div>
                </div>
                <div className="block sm:hidden w-full bg-white/10 rounded p-4">
                  <p className="text-lg font-medium mb-2 text-white capitalize">
                    Name : {pokemon.name}
                  </p>
                  <p className="text-lg font-medium mb-2 text-white">
                    Height : {pokemon.height}
                  </p>
                  <p className="text-lg font-medium mb-2 text-white">
                    Weight : {pokemon.weight}
                  </p>
                  <p className="text-lg font-medium mb-2 text-white capitalize">
                    Type : {pokemon.types}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </main>
      <div className="blob size-3/4 fixed top-0 bottom-0 left-0 right-0 m-auto blur-[100px]"></div>
    </>
  );
}

export default Pokemon;
