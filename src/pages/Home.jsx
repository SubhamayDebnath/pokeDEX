import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import Footer from "../components/Footer";
function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokeDEX, setPokeDEX] = useState(`https://pokeapi.co/api/v2/pokemon/`);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const downloadPokemon = async () => {
    setLoading(true);
    const response = await axios.get(pokeDEX);
    const responseResults = response.data.results;

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
    const responseResultPromise = responseResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(responseResultPromise);
    const result = pokemonData.map((pokemon) => {
      const pokemonSingleData = pokemon.data;
      return {
        id: pokemonSingleData.id,
        name: pokemonSingleData.name,
        image: pokemonSingleData.sprites.other.dream_world.front_default,
        type: pokemonSingleData.types,
      };
    });
    setPokemon(result);
    setLoading(false);
  };
  useEffect(() => {
    downloadPokemon();
  }, [pokeDEX]);
  return (
    <>
      <main className="w-dvw min-h-dvh relative flex flex-col backdrop-blur-3xl">
        <Navbar />
        <div className="max-w-screen-xl w-full mx-auto py-5 lg:px-12 md:px-8 px-4">
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
              <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                {pokemon.map((pokemon) => (
                  <PokemonCard
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    type={pokemon.type}
                    key={pokemon.id}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center md:justify-end gap-4 py-5">
                {prevUrl != null && (
                  <button
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded text-white text-sm font-light border border-white/20 transition-colors duration-300 ease-in-out hover:bg-white/10 hover:border-white/30"
                    onClick={() => setPokeDEX(prevUrl)}
                  >
                    <IoIosArrowBack />
                    Previous
                  </button>
                )}
                {nextUrl != null && (
                  <button
                    className="flex items-center gap-2 py-1.5 px-2.5 rounded text-white text-sm font-light border border-white/20 transition-colors duration-300 ease-in-out hover:bg-white/10 hover:border-white/30"
                    onClick={() => setPokeDEX(nextUrl)}
                  >
                    Next
                    <IoIosArrowForward />
                  </button>
                )}
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

export default Home;
