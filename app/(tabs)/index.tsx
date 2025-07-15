import { database } from '@/FirebaseConfig';
import { get, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Props = {}

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

  useEffect(() => {
    // Fetch classes from the database
    const fetchClasses = async () => {
      try{
        const classesRef = ref(database, 'classes');
        const snapshot = await get(classesRef);

        if(snapshot.exists()) {
          const data = snapshot.val();
          const classList : ClassItem[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setClasses(classList);
        } else{
          console.log("No classes found");
          setClasses([]);
        }
      } catch (error: any){
        console.error("Error fetching classes:", error.message);
      }
    };

    fetchClasses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Classes</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.schedule}>{item.day_of_week} at {item.time_of_course}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  schedule: {
    fontSize: 14,
    color: '#555',
  },
})