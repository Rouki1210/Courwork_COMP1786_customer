import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {}

const NotificationsScreen = (props: Props) => {
  // Example notifications array
  const notifications = [
    {
      id: '1',
      title: 'Class reminder',
      message: 'Yoga class starts in 30 minutes.',
      badgeCount: 1,
    },
    {
      id: '2',
      title: 'Payment successful',
      message: 'Your payment for Pilates class was successful.',
      badgeCount: 0,
    },
  ];

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
