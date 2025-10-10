import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../interfaces/CartItem';

const ShoppingCartContext = createContext<any>(null);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart)); 
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('shoppingCart', JSON.stringify(cart)); 
    } else {
      localStorage.removeItem('shoppingCart');
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]); 
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
