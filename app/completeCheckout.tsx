import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const SuccessfullyPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear cart on success
    AsyncStorage.removeItem('cart');
  }, []);

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
      <Text style={styles.title}>✅ Payment Successful</Text>
      <Text style={styles.subtitle}>Thank you for your purchase!</Text>

      <Pressable style={styles.button} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
    </>
  );
};

export default SuccessfullyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0BEC5',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#121212',
    fontWeight: '700',
    fontSize: 16,
  },
});
