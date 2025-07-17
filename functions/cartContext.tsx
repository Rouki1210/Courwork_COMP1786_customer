// constants/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../constants/CartItem';
import { loadCart, saveCart } from './CartStorage';

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            const storedCart = await loadCart();
            setCartItems(storedCart);
        };
        fetchCart();
    }, []);

    const saveAndSetCart = async (newCart: CartItem[]) => {
        setCartItems(newCart);
        await saveCart(newCart);
    };

    const addToCart = (item: CartItem) => {
        const newCart = [...cartItems, item];
        saveAndSetCart(newCart);
    };

    const removeFromCart = (id: string) => {
        const newCart = cartItems.filter(item => item.id !== id);
        saveAndSetCart(newCart);
    };

    const clearCart = () => {
        saveAndSetCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used inside CartProvider');
    return context;
};
