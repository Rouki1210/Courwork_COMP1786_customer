import { Ionicons } from '@expo/vector-icons'
import { Link, router, Stack } from 'expo-router'
import { createUserWithEmailAndPassword, User } from "firebase/auth"
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputField from '../components/inputField'
import { Colors } from '../constants/Colors'
import { auth } from '../FirebaseConfig'; // Adjust the import based on your firebase config file


type Props = {}

const SignUpScreen = (props: Props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);


  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.replace("/"); // Navigate to home after successful registration
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <>
      <Stack.Screen options={{
        title: 'Sign Up', headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='close' size={24} color={Colors.black} />
          </TouchableOpacity>
        )
      }} />
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <InputField
          placeholder='Email Address'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} />
        <InputField
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword} />
        <InputField
          placeholder='Confirm Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword} />

        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Already have an account? {" "}
          <Link href={"/signin"} asChild>
            <TouchableOpacity>
              <Text style={styles.registerTxtSpan}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </Text>
      </View>
    </>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  registerText: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 15,
    lineHeight: 16,
  },
  registerTxtSpan: {
    color: Colors.primary,
    fontWeight: "600",
  },
})