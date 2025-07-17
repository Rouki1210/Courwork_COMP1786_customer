import { CartItem } from '@/constants/CartItem';
import { database } from '@/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Props = {}
const CART_STORAGE_KEY = 'user_cart';


type ClassItem = {
  id: string;
  name: string;
  description: string;
  teacher: string;
  durationMinutes: string;
  maxCapacity: string;
  day_of_week: string;
  time_of_course: string;
  price: string;
};



const HomeScreen = (props: Props) => {
  const [classes, setClasses] = React.useState<ClassItem[]>([]);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch classes from the database
    const fetchClasses = async () => {
      try {
        const classesRef = ref(database, 'classes');
        const snapshot = await get(classesRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const classList: ClassItem[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setClasses(classList);
        } else {
          console.log("No classes found");
          setClasses([]);
        }
      } catch (error: any) {
        console.error("Error fetching classes:", error.message);
      }
    };
    
    fetchClasses();
  }, []);
  

  const handleAddToCart = (item: ClassItem) => {
  const newCartItem: CartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    teacher: item.teacher,
  };

  setCartItems((prev) => {
    const exists = prev.find((i) => i.id === newCartItem.id);
    if (exists) {
      alert('This class is already in your cart.');
      return prev;
    }
    return [...prev, newCartItem];
  });
};
useEffect(() => {
  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  saveCart();
}, [cartItems]);


  const renderItem = ({ item }: { item: ClassItem }) => (
   <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>
          {item.day_of_week} at {item.time_of_course}
        </Text>
        <Text style={styles.cardText}>{item.description}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.detailText}>👨‍🏫 {item.teacher}</Text>
          <Text style={styles.detailText}>🕒 {item.durationMinutes} min</Text>
          <Text style={styles.detailText}>💰 ${item.price}</Text>
          <Text style={styles.detailText}>👥 Max {item.maxCapacity}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.rightButton}
        onPress={() => {
          console.log(`Added ${item.name} to cart`);
          handleAddToCart(item);
          // Replace with real logic!

        }}
      >
        <Text style={styles.rightButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Class Schedule</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark background
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00BCD4', // bright teal accent
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E', // slightly lighter dark for cards
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  cardContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00E5FF', // bright electric cyan
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#B0BEC5', // soft gray
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#ECEFF1', // light text on dark
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#80DEEA', // lighter teal
  },
rightButton: {
  backgroundColor: '#263238', // dark charcoal for subtle contrast
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#00BCD4',
},

rightButtonText: {
  color: '#00BCD4',
  fontSize: 18,
  fontWeight: '700',
},
});


