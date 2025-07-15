import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {};

type CartItem = {
  id: string;
  name: string;
  price: string;
  teacher: string;
};

const initialCart: CartItem[] = [
  { id: '1', name: 'Yoga for Beginners', price: '15', teacher: 'Alice' },
  { id: '2', name: 'HIIT Training', price: '20', teacher: 'Bob' },
];

const CartScreen = (props: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const handleDelete = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛒 Your Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.teacher}>👨‍🏫 {item.teacher}</Text>
                <Text style={styles.price}>💰 ${item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteText}>✖</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      {cartItems.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00E5FF',
    marginBottom: 4,
  },
  teacher: {
    fontSize: 14,
    color: '#B0BEC5',
  },
  price: {
    fontSize: 14,
    color: '#80DEEA',
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  summary: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  totalText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#00BCD4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: '#B0BEC5',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
