import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MerchandiseGrid from '../components/MerchandiseGrid';
import { SearchableProps } from '../interfaces/SearchableProps';
import { MerchandiseItem } from '../interfaces/MerchandiseItem';

const DeleteMerchandise: React.FC<SearchableProps> = ({ searchTerm, setSearchTerm }) => {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await axios.get('http://localhost:5259/api/TrumpMerch');
        setMerchandise(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, []);

  const filteredMerchandise = merchandise.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = async (item: MerchandiseItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      try {
        await axios.delete(`http://localhost:5259/api/TrumpMerch/${item.id}`);
        const response = await axios.get('http://localhost:5259/api/TrumpMerch');
        setMerchandise(response.data);
        alert('Item deleted successfully!');
      } catch (error) {
        console.error('Error deleting merchandise:', error);
        alert('Error deleting merchandise!');
      }
    }
  };

  if (loading) return <p>Loading merchandise...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-6 top-0 bg-white z-10">Delete Merchandise</h2>

      <MerchandiseGrid
        items={filteredMerchandise}
        onActionClick={handleDeleteClick}
        actionButtonLabel="Delete"
        actionButtonClassName="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        enableDetailLink={false} 
      />
    </div>
  );
};

export default DeleteMerchandise;
