import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {};

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedAt: string;
  avatarUrl: string;
};

const ProfileScreen = (props: Props) => {
  const customer: Customer = {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-1234',
    address: '123 Main St, Springfield',
    joinedAt: '2024-06-12',
    avatarUrl: '',
  };

  useEffect(() => {
    
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: customer.avatarUrl || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.email}>{customer.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📞 Phone:</Text>
          <Text style={styles.infoValue}>{customer.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🏠 Address:</Text>
          <Text style={styles.infoValue}>{customer.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🗓️ Joined:</Text>
          <Text style={styles.infoValue}>{customer.joinedAt}</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 140,
    backgroundColor: '#00BCD4',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  name: {
    color: '#00E5FF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  email: {
    color: '#B0BEC5',
    fontSize: 14,
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    width: 100,
    color: '#80DEEA',
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    flex: 1,
    color: '#ECEFF1',
    fontSize: 14,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#00BCD4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
