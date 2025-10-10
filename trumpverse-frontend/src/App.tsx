import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigations';
import RoutesComponent from './components/RoutesComponent';
import './styles/fonts.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchClear = () => setSearchTerm('');

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClear={handleSearchClear}
        />
        <main
          className="container mx-auto p-4 min-h-screen flex justify-center items-center"
          style={{
            paddingTop: isSearchOpen ? '90px' : '0px',
            transition: 'padding-top 0.3s ease',
          }}
        >
          <div className="w-full max-w-6xl">
            <RoutesComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
