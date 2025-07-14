import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const SignInScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>SignIn Screen</Text>
      <Link href={"/"} asChild>
        <TouchableOpacity onPress={() => {
          // router.dismissAll();
          // router.push('/');
        }}>
          <Text>Go to App Home Screen</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})