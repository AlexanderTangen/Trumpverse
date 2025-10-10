import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { DropdownProps } from '../interfaces/DropdownProps';

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({ items, setIsOpen }, ref) => {
  return (
    <div 
      ref={ref} 
      className="absolute right-0 mt-2 w-72 bg-white text-black shadow-md rounded-lg z-50 overflow-visible border border-gray-200"
    >
      <ul>
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-200 rounded-lg"
          >
            <Link
              to={item.to}
              className="flex-1"
              onClick={() => setIsOpen(false)} 
            >
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
