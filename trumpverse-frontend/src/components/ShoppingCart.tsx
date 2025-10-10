import React, { useState } from 'react';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { CartItem } from '../interfaces/CartItem';
import axios from 'axios';

function ShoppingCart() {
    const { cart, removeFromCart, clearCart } = useShoppingCart();
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const totalPrice = cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        try {
            const stockUpdates = cart.map((item: CartItem) => ({
                id: parseInt(item.id), 
                quantity: item.quantity,
            }));

            const response = await axios.post('http://localhost:5259/api/TrumpMerch/update-stock', stockUpdates, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                clearCart();
                setCheckoutSuccess(true);
            } else {
                throw new Error('Failed to update stock');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Checkout failed. Please try again.');
        }
    };

    return (
        <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {checkoutSuccess ? (
                <div className="text-gray-500 font-semibold">
                    <p>Thank you for your purchase!</p>
                </div>
            ) : (
                <div>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div>
                            <ul>
                                {cart.map((item: CartItem) => (
                                    <li key={item.id} className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <img
                                                src={`http://localhost:5259${item.imageUrl}`}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover mr-4"
                                            />
                                            <div>
                                                <p>{item.name} (x{item.quantity})</p>
                                                <p className="text-sm text-gray-600">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 border-t pt-4">
                                <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={handleCheckout}
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
