import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SortButton from "./components/SortButton";
import CharacterCard from "./components/CharacterCard";
import './App.css';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
}

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const sortCharacters = (characters: Character[]) => {
    return characters.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const filteredCharacters = characters.filter((character) => {
    return (
      character.name.toLowerCase().includes(search.toLowerCase()) ||
      character.species.toLowerCase().includes(search.toLowerCase()) ||
      character.status.toLowerCase().includes(search.toLowerCase()) ||
      character.gender.toLowerCase().includes(search.toLowerCase())
    );
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-6xl font-extrabold text-white mb-12 text-shadow-lg tracking-wide">
          Rick and Morty Characters
        </h1>

        <SearchBar search={search} setSearch={setSearch} />
        <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />

        {loading ? (
          <div className="text-center text-lg text-yellow-200 animate-pulse">Loading...</div>
        ) : (
          <div className="grid">
            {sortCharacters(filteredCharacters).map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(character.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
