import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../constants/CartItem'; // ✅ Update path based on your structure

const CART_KEY = 'user_cart';

export const saveCart = async (cart: CartItem[]) => {
  try {
    const jsonValue = JSON.stringify(cart);
    await AsyncStorage.setItem(CART_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
};

export const loadCart = async (): Promise<CartItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load cart:', e);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error('Failed to clear cart:', e);
  }
};
