import { onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { database } from '../../FirebaseConfig'; // Adjust the import based on your firebase config file

type Props = {}

type User = {
  id: string;
  name: string;
  email: string;
};

const ProfileScreen = (props: Props) => {
  const [users, setUser] = React.useState<User[]>([])

  useEffect(() => {
    const usersRef = ref(database, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUser(userData);
      } else {
        setUser([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={users} keyExtractor={(item) => item.id} renderItem={({ item }) => (
        <Text>{item.name} - {item.email}</Text>
      )} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})