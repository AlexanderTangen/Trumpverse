import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../contexts/ShoppingCartContext'; 
import { MerchandiseItem } from '../interfaces/MerchandiseItem';
import { CartItem } from '../interfaces/CartItem';

function MerchandiseDetail() {
    const { id } = useParams<{ id: string }>(); 
    const { addToCart } = useShoppingCart(); 
    const [item, setItem] = useState<MerchandiseItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchItemDetail = async () => {
            if (!id) {
                setError('Item ID is missing');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5259/api/TrumpMerch/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch merchandise details');
                }
                const data: MerchandiseItem = await response.json();
                setItem(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetail();
    }, [id]);

    if (loading) return <p>Loading item details...</p>;
    if (error) return <p>{error}</p>;

    const handleAddToCart = () => {
        if (item && item.stock > 0) {
            const cartItem: CartItem = {
                id: item.id.toString(),
                name: item.name,
                price: item.price,
                quantity: 1, 
                imageUrl: item.imageUrl
            };
            addToCart(cartItem); 
        }
    };

    return (
        <div className="p-4">
            {item && (
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                        <img 
                            src={`http://localhost:5259${item.imageUrl}`} 
                            alt={item.name} 
                            className="w-full h-auto max-h-[512px] object-cover rounded-lg" 
                        />
                    </div>

                    <div className="md:w-1/2 flex flex-col justify-between">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <p className="font-semibold text-xl mb-4">${item.price.toFixed(2)}</p>

                        <p className="text-gray-700 mb-4">
                            {item.stock > 0 ? `Available Stock: ${item.stock}` : 'Out of Stock'}
                        </p>

                        <button 
                            onClick={handleAddToCart} 
                            disabled={item.stock === 0} 
                            className={`${
                                item.stock === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white px-6 py-3 rounded-md`}
                        >
                            {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MerchandiseDetail;
