import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ onSearch, history }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 400);
  const inputRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (debouncedInput.trim()) {
      onSearch(debouncedInput.trim());
    }
  }, [debouncedInput, onSearch]);

  const handleInput = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleChipClick = (term) => {
    setInput(term);
    onSearch(term);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="relative flex w-full max-w-3xl mb-4 group" autoComplete="off">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Search for amazing nature, photography, or abstract images..."
          className="w-full pl-14 pr-32 py-4 sm:py-5 bg-white rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-[4px] focus:ring-blue-100 focus:border-blue-400 text-base sm:text-lg transition-all duration-300 placeholder:text-slate-400 font-medium text-slate-700"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 px-6 py-2.5 sm:px-8 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 flex items-center gap-2"
        >
          Search
        </button>
      </form>
      {history?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2.5 mt-2 w-full max-w-3xl mb-4">
          {history.map((term, idx) => (
            <button
              key={term + idx}
              onClick={() => handleChipClick(term)}
              className="px-4 py-1.5 bg-white text-slate-600 rounded-full text-sm font-medium shadow-sm border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 hover:-translate-y-0.5"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
