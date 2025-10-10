import React, { forwardRef } from 'react';
import { SearchInputProps } from '../interfaces/SearchInputProps';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear }, ref) => {
    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation(); 
      onClear(); 
    };

    return (
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <i className="fas fa-magnifying-glass"></i>
        </div>
        <input
          ref={ref}
          type="text"
          placeholder="Search store"
          value={value}
          onChange={onChange}
          className="pl-8 p-1 rounded-2xl w-full text-black placeholder-gray-400 md:py-3 md:h-10 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white" // Added focus styles
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            &#x2715;
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
