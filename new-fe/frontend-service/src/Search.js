import React from 'react';

function Search({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="search here..."
      className="bg-gray-200 p-2 rounded w-full md:w-1/2"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default Search;
