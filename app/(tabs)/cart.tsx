import { database } from '@/FirebaseConfig';
import { loadCart, saveCart } from '@/functions/CartStorage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { push, ref, set } from 'firebase/database';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem } from '../../constants/CartItem'; // Assuming CartItem is exported from cart.tsx

type Props = {};

const CartScreen = (props: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        const storedCart = await loadCart();
        setCartItems(storedCart);
      };

      fetchCart();
    }, [])
  );

  const handlCheckout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    try{
      // Save cart items to the database
      const userRef = ref(database, `users/${user?.uid}/cartItems`);
      await set(userRef, cartItems);


    const orderRef = push(ref(database, `orders`)); // user-specific orders
    await set(orderRef, {
      items: cartItems,
      totalPrice: totalPrice,
      createdAt: new Date().toISOString(),
      status: 'pending',
      userId: user?.uid,
    });

      // Create a notification for the user
      const notificationRef = ref(database, `users/${user?.uid}/notifications`);
      const newNotification = push(notificationRef);
      await set(newNotification, {
        title: 'Checkout Successful',
        message: 'Your order has been placed successfully.',
        badgeCount: 1,
        createdAt: new Date().toISOString(),
      });

      // Optionally, you can navigate to a confirmation screen
      await saveCart(cartItems);
      router.replace('../completeCheckout');

      // Clear the cart after checkout
      setCartItems([]); 
    } 
    // If there's an error, you can handle it here
    catch (error) {
      console.error('Error during checkout:', error);
    }
  };

    const handleDelete = async (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);              
    await saveCart(updatedCart);            
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛒 Your Cart {cartItems.length > 0 ? `(${cartItems.length})` : ''}</Text>

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
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handlCheckout}
          >
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
