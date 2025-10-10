import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import SearchInput from './SearchInput';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import ShoppingCart from './ShoppingCart';
import { NavigationProps } from '../interfaces/NavigationProps';  

const Navigation: React.FC<NavigationProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  searchTerm,
  setSearchTerm,
  handleSearchClear,
}) => {
  const { cart } = useShoppingCart();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isManagementOpen, setIsManagementOpen] = useState<boolean>(false);

  const cartRef = useRef<HTMLDivElement | null>(null);
  const managementRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleCartDropdown = () => setIsCartOpen((prev) => !prev);
  const toggleManagementDropdown = () => setIsManagementOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (managementRef.current && !managementRef.current.contains(event.target as Node)) {
        setIsManagementOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);  
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSearchOpen]);  

  const menuItems = [
    { label: 'Merchandise', to: '/merch-list' },
    { label: 'Add Merchandise', to: '/add-merchandise' },
    { label: 'Edit Merchandise', to: '/edit-merchandise' },
    { label: 'Delete Merchandise', to: '/delete-merchandise' },
  ];

  return (
    <header className="bg-red-800 text-white p-4 w-full">
      <nav className="max-w-full mx-auto flex justify-between items-center px-6 md:px-4">
        <button
          className="md:hidden mr-5"
          onClick={toggleMenu}
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}
        >
          <i className="fas fa-bars"></i>
        </button>
        <button
          className="md:hidden"
          onClick={toggleSearch}
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px' }}
        >
          <i className="fas fa-magnifying-glass"></i>
        </button>

        {isSearchOpen && (
          <div ref={searchRef} className="absolute top-16 left-0 w-full bg-red-800 p-4 z-50">
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onClear={handleSearchClear} />
          </div>
        )}

        <h1 className="text-2xl font-bold mx-auto md:mx-0 text-center md:text-left md:mr-8">
          <Link to="/merch-list" className="no-underline hover:no-underline">
            TRUMP VERSE
          </Link>
        </h1>
      
        <div className="hidden md:flex flex-1 justify-start w-full max-w-md ml-4 relative">
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onClear={handleSearchClear} />
        </div>

        <ul className="flex space-x-4 items-center md:space-x-2">
          <li className="relative hidden md:block">
            <Link to="/merch-list" className="hover:underline text-sm md:text-base md:ml-8">
              MERCHANDISE
            </Link>
          </li>
          <li className="relative hidden md:block">
            <button onClick={toggleManagementDropdown} className="hover:underline text-sm md:text-base">
              MERCH MANAGEMENT
            </button>
            {isManagementOpen && (
              <Dropdown
                ref={managementRef}
                setIsOpen={setIsManagementOpen}
                items={[
                  { label: 'Add Merchandise', to: '/add-merchandise' },
                  { label: 'Edit Merchandise', to: '/edit-merchandise' },
                  { label: 'Delete Merchandise', to: '/delete-merchandise' },
                ]}
              />
            )}
          </li>

          <li className="relative">
            <button onClick={toggleCartDropdown} className="flex items-center space-x-2 relative">
              <img src="/icons/Shopping_Bag.svg" alt="Shopping Cart" className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 left-3 bg-blue-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div ref={cartRef} className="absolute right-0 mt-2 w-72 bg-white text-black shadow-md rounded-lg z-50 border border-gray-200">
                <ShoppingCart />
              </div>
            )}
          </li>
        </ul>
      </nav>

      {isMenuOpen && (
        <div ref={menuRef} className="md:hidden bg-red-800 text-white p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label} className="py-2">
                <Link to={item.to} className="block hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
