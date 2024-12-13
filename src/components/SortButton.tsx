import React from 'react';

interface SortButtonProps {
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition duration-200"
      >
        Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
      </button>
    </div>
  );
};

export default SortButton;
