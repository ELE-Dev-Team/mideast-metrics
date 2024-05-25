import React, { useState, useRef } from "react";
import { SearchIcon } from '@heroicons/react/solid';

export default function CountryForm({ onSelectCountry }) {
  const [currentCountry, setCurrentCountry] = useState("");
  const inputRef = useRef(null);

  function handleFormChange(event) {
    setCurrentCountry(event.target.value);
  }

  function handleSubmitClick(event) {
    event.preventDefault();
    onSelectCountry(currentCountry);
    setCurrentCountry("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="items-center">
      <form onSubmit={handleSubmitClick} className="flex items-center space-x-2">
        <input
          name="text"
          onChange={handleFormChange}
          placeholder="Enter Country Name..."
          className="outline-none p-1 rounded"
          value={currentCountry}
          ref={inputRef}
        />
        <button type="submit" className="border rounded p-1 text-white hover:bg-gray-700">
          <SearchIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
