import InputField from "@/components/inputField";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ref, set } from "firebase/database";
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { database } from "../FirebaseConfig"; // Adjust the import based on your firebase config file

type Props = {};

const ContinueScreen = (props: Props) => {
    const { uid, email } = useLocalSearchParams<{ uid: string, email: string }>();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSave = async() => {
        // Save the user information
        if (!name || !phone) {
            alert("Please fill all fields.");
            return;
        }
        // Add save logic
        try {
            // Save user profile to Realtime Database
            await set(ref(database, `users/${uid}`), {
                id: uid,
                name: name,
                email: email,
                phone: phone,
                role: "CUSTOMER",
                createdAt: new Date().toISOString(),
            });

            alert("Profile saved successfully!");
            router.replace("/(tabs)");
        } catch (error: any) {
            alert(error.message);
        }
    };


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Complete Your Profile',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} color="black" />
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Complete Your Profile</Text>
                <InputField
                    placeholder='Full Name'
                    placeholderTextColor={Colors.gray}
                    value={name}
                    onChangeText={setName} />
                <InputField
                    placeholder='Phone Number'
                    placeholderTextColor={Colors.gray}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone} />
                <TouchableOpacity style={styles.btn} onPress={handleSave}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default ContinueScreen;

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