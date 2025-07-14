import { Ionicons } from '@expo/vector-icons'
import { Stack, router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputField from '../components/inputField'
import { Colors } from '../constants/Colors'

type Props = {}

const SignUpScreen = (props: Props) => {
  return (
    <>
    <Stack.Screen options={{ title: 'Sign Up', headerLeft: ()=> (
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name='close' size={24} color={Colors.black} />
      </TouchableOpacity>
    ) }} />
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <InputField placeholder='Email Address' placeholderTextColor={Colors.gray} autoCapitalize='none' keyboardType="email-address"/>
      <InputField placeholder='Password' placeholderTextColor={Colors.gray} secureTextEntry={true} />
      <InputField placeholder='Confirm Password' placeholderTextColor={Colors.gray} secureTextEntry={true} />
      {/* Add more input fields as needed */}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: '#333',
    marginBottom: 50
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  }
})