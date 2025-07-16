// src/types/cart.ts

export type CartItem = {
  id: string;
  name: string;
  price: string;
  teacher: string;
};

// Optional: export initial dummy cart
export const initialCart: CartItem[] = [
  { id: '1', name: 'Yoga for Beginners', price: '15', teacher: 'Alice' },
  { id: '2', name: 'HIIT Training', price: '20', teacher: 'Bob' },
];
