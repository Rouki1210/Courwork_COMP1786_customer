import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const ProfileScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Log Out</Text>
        <Ionicons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>
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