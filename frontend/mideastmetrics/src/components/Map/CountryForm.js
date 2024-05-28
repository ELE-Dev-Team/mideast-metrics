import React, { useState, useRef } from "react";
import { SearchIcon } from '@heroicons/react/solid';

export default function CountryForm({ onSelectCountry, validCountries }) {
  const [currentCountry, setCurrentCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  function handleFormChange(event) {
    const userInput = event.target.value;
    setCurrentCountry(userInput);

    const filteredSuggestions = validCountries.filter(country =>
      country.toLowerCase().startsWith(userInput.toLowerCase())
    ).slice(0, 5);
    
    setSuggestions(filteredSuggestions);
  }

  function handleSuggestionClick(suggestion) {
    setCurrentCountry(suggestion);
    setSuggestions([]);
    onSelectCountry(suggestion);
  }

  function handleSubmitClick(event) {
    event.preventDefault();
    onSelectCountry(currentCountry);
    setCurrentCountry("");
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center justify-center md:justify-start relative">
      <form onSubmit={handleSubmitClick} className="flex items-center space-x-2 w-full max-w-xs md:max-w-none">
        <input
          name="text"
          onChange={handleFormChange}
          placeholder="Enter Country Name..."
          className="outline-none p-1 rounded w-full md:w-auto"
          value={currentCountry}
          ref={inputRef}
        />
        <button type="submit" className="border rounded p-1 text-white hover:bg-gray-700">
          <SearchIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute top-10 bg-white border rounded w-full max-w-xs md:max-w-none z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
