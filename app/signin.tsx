import { Ionicons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import { signInWithEmailAndPassword, User } from "firebase/auth";
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from '../components/inputField';
import { Colors } from '../constants/Colors';
import { auth } from '../FirebaseConfig'; // Adjust the import based on your firebase config file

type Props = {}

const SignInScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert('Login failed', `User or password is incorrect.`);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Sign In',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.replace("/")}>
            <Ionicons name='close' size={24} color={Colors.black} />
          </TouchableOpacity>
        )
      }} />
      <View style={styles.container}>
        <Text style={styles.title}>Login with your account</Text>
        <InputField
          placeholder='Email Address'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.registerTxtSpan}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </Text>
      </View>
    </>
  )
}

export default SignInScreen

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
});
