// App.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { auth } from "../FirebaseConfig"; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={{ padding: 40 }}>
            {user ? (
                <Text>Welcome, {user.email}</Text>
            ) : (
                <>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ borderWidth: 1, marginBottom: 10 }}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        style={{ borderWidth: 1, marginBottom: 10 }}
                    />
                    <Button title="Register" onPress={handleRegister} />
                    <Button title="Login" onPress={handleLogin} />
                </>
            )}
        </View>
    );
}
