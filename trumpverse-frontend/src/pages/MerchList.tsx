import React, { useState, useEffect } from 'react';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { MerchandiseItem } from '../interfaces/MerchandiseItem';
import { CartItem } from '../interfaces/CartItem';
import { Link } from 'react-router-dom';

const MerchList: React.FC<{ searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }> = ({ searchTerm, setSearchTerm }) => {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useShoppingCart();

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await fetch('http://localhost:5259/api/TrumpMerch');
        if (!response.ok) {
          throw new Error('Failed to fetch merchandise');
        }
        const data: MerchandiseItem[] = await response.json();
        setMerchandise(data);
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

  const sortedMerchandise = filteredMerchandise.sort((a, b) => {
    if (a.stock === 0 && b.stock > 0) return 1;
    if (a.stock > 0 && b.stock === 0) return -1;
    return 0;
  });

  const handleAddToCart = (item: MerchandiseItem) => {
    const cartItem: CartItem = {
      ...item,
      id: item.id.toString(),
      quantity: 1,
    };
    addToCart(cartItem);
  };

  if (loading) return <p>Loading merchandise...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Merchandise</h2>

      {sortedMerchandise.length === 0 && (
        <p className="text-left text-gray-500 text-xl mb-6">No results.</p>
      )}

      {sortedMerchandise.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMerchandise.map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg shadow p-4 flex flex-col justify-between h-full ${
                item.stock === 0 ? 'opacity-50' : ''
              }`}
            >
              <div className="relative">
                <Link
                  to={`/merch-list/${item.id}`} 
                  className="flex flex-col h-full"
                >
                  <img
                    src={`http://localhost:5259${item.imageUrl}`}
                    alt={item.name}
                    className={`w-full h-78 object-cover mb-2 rounded ${
                      item.stock === 0 ? 'filter grayscale' : ''
                    }`}
                  />
                </Link>
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-auto font-semibold">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0} 
                  className={`px-4 py-2 rounded ${
                    item.stock === 0
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MerchList;
