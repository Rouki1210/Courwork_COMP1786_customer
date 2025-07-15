import { database } from '@/FirebaseConfig';
import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {};

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

const ExploreScreen = (props: Props) => {
  const [query, setQuery] = useState('');
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
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
          setFilteredClasses(classList);
        } else {
          console.log('No classes found');
          setClasses([]);
          setFilteredClasses([]);
        }
      } catch (error: any) {
        console.error('Error fetching classes:', error.message);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const filtered = classes.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.teacher.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClasses(filtered);
  }, [query, classes]);

  const renderItem = ({ item }: { item: ClassItem }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>📚 {item.name}</Text>
      <Text style={styles.cardSubtitle}>
        Teacher: {item.teacher} • {item.day_of_week} at {item.time_of_course}
      </Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.detailText}>⏱ {item.durationMinutes} min</Text>
        <Text style={styles.detailText}>💰 ${item.price}</Text>
        <Text style={styles.detailText}>👥 Max {item.maxCapacity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔎 Explore Classes</Text>

      <TextInput
        placeholder="Search classes or teachers..."
        placeholderTextColor="#888"
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No classes found.</Text>
        }
      />
    </View>
  );
};

export default ExploreScreen;

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
  searchInput: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00E5FF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#B0BEC5',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ECEFF1',
    marginBottom: 12,
  },
  cardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailText: {
    fontSize: 13,
    color: '#80DEEA',
  },
  emptyText: {
    color: '#B0BEC5',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});
