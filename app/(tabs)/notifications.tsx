import { getAuth } from 'firebase/auth';
import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { database } from '../../FirebaseConfig'; // Adjust the import path as necessary

type Props = {}

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  badgeCount: number;
  createdAt?: string;
};

const NotificationsScreen = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const snapshot = await get(child(ref(database), `users/${user?.uid}/notifications`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('Notifications data:', data);
          const formattedNotifications: NotificationItem[] = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            title: value.title ,
            message: value.message,
            badgeCount: value.badgeCount ?? 0,
            createdAt: value.createdAt ?? undefined, // Optional
          })
        );
          console.log('Formatted notifications:', formattedNotifications);
          setNotifications(formattedNotifications);
        } else {
          console.log('No notifications found');
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

    fetchNotifications();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔔 Notifications</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>You have no notifications 🎉</Text>
        ) : (
          notifications.map((item) => (
            <View key={item.id} style={styles.notificationCard}>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
              </View>

              {item.badgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badgeCount}</Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#00BCD4',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyText: {
    color: '#B0BEC5',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  notificationCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    color: '#00E5FF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    color: '#ECEFF1',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#FF3B30',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
