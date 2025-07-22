import { getAuth } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { database } from "../../FirebaseConfig"; // Adjust path as needed

type Props = {};

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  avatarUrl?: string;
};

const ProfileScreen = (props: Props) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState(customer?.name || "");
  const [editPhone, setEditPhone] = useState(customer?.phone || "");
  const [editAddress, setEditAddress] = useState(customer?.address || "");
  const [editAvatarUrl, setEditAvatarUrl] = useState(customer?.avatarUrl || "");

  const openEditModal = () => {
  if (!customer) return;
  setEditName(customer.name);
  setEditPhone(customer.phone);
  setEditAddress(customer.address);
  setEditAvatarUrl(customer.avatarUrl || "");
  setModalVisible(true);
};

const saveProfileChanges = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  try {
    const customerRef = ref(database, `users/${user.uid}`);
    await set(customerRef, {
      ...customer,
      name: editName,
      phone: editPhone,
      address: editAddress,
    });
    setCustomer(prev => prev ? ({
      ...prev,
      name: editName,
      phone: editPhone,
      address: editAddress,
    }) : null);
    setModalVisible(false);
  } catch (error: any) {
    alert("Failed to update: " + error.message);
  }
};



  useEffect(() => {
    const fetchCustomerData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const customerRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(customerRef);
        if (snapshot.exists()) {
          setCustomer(snapshot.val());
        } else {
          console.log("No customer data found");
        }
      } else {
        console.log("No user is currently signed in");
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: customer?.avatarUrl || 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{customer?.name}</Text>
        <Text style={styles.email}>{customer?.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📞 Phone:</Text>
          <Text style={styles.infoValue}>{customer?.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🏠 Address:</Text>
          <Text style={styles.infoValue}>{customer?.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🗓️ Joined:</Text>
          <Text style={styles.infoValue}>
            {customer?.createdAt
              ? new Date(customer.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
              : 'N/A'}
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={editPhone}
              onChangeText={setEditPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={editAddress}
              onChangeText={setEditAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Avatar URL"
              value={editAvatarUrl}
              onChangeText={setEditAvatarUrl}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.saveButton} onPress={saveProfileChanges}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: '#fff',
  width: '90%',
  padding: 20,
  borderRadius: 10,
  elevation: 10,
},
modalTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 10,
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginBottom: 10,
  fontSize: 14,
},
saveButton: {
  backgroundColor: '#00BCD4',
  padding: 10,
  borderRadius: 6,
  flex: 1,
  marginRight: 5,
  alignItems: 'center',
},
cancelButton: {
  backgroundColor: '#ccc',
  padding: 10,
  borderRadius: 6,
  flex: 1,
  marginLeft: 5,
  alignItems: 'center',
},
saveButtonText: {
  color: '#fff',
  fontWeight: '700',
},
cancelButtonText: {
  color: '#333',
  fontWeight: '600',
},

});
