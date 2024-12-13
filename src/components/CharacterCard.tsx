import React from 'react';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
}

interface CharacterCardProps {
  character: Character;
  toggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, toggleFavorite, isFavorite }) => {
  return (
    <div
      key={character.id}
      className="bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">{character.name}</h2>
      <p className="text-center text-gray-500 mb-4">{character.species}</p>

      {}
      <button
        onClick={() => toggleFavorite(character.id)}
        className={`w-full py-3 rounded-xl text-white ${
          isFavorite
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        } transition duration-200`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default CharacterCard;
