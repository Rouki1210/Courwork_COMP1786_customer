import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Reanimated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { Colors } from "../constants/Colors";

type Props = {};
const WelcomeScreen = (props: Props) => {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ImageBackground source={require('../assets/images/ecommerce-splash.jpg')}
                style={{ flex: 1, }}
                resizeMode="cover">
                <View style={styles.container}>
                    <LinearGradient colors={["transparent", "rgba(255,255,255,0.8)", "rgba(255,255,255,1)"]} style={styles.background}> 
                        <View style={styles.wrapper}>
                            <Reanimated.Text 
                                style={styles.title} 
                                entering={FadeInRight.delay(300).duration(300).springify()}>
                                Yoga App
                            </Reanimated.Text>
                            <Reanimated.Text 
                                style={styles.description} 
                                entering={FadeInRight.delay(500).duration(300).springify()}>
                                Welcome to the Yoga App
                            </Reanimated.Text>
                            <View style={styles.socialLoginWrapper}>
                                <Reanimated.View entering={FadeInDown.delay(700).duration(300).springify()}>
                                    <Link href={"/signin"} asChild>
                                        <TouchableOpacity style={styles.button}>
                                            <Ionicons name="mail-outline" size={20} color={Colors.black} />
                                            <Text style={styles.buttonText}>Continue with Email</Text>
                                        </TouchableOpacity>
                                    </Link>
                                </Reanimated.View>
                            </View>
                            <Text style={styles.registerText}>
                                    Don&apos;t have an account? {""}
                                    <Link href={"/signup"} asChild>
                                        <TouchableOpacity>
                                            <Text style={styles.registerTxtSpan}>Sign Up</Text>
                                        </TouchableOpacity>
                                    </Link>
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            </ImageBackground>
        </>
    );
};

export default WelcomeScreen;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "flex-end",
    },
    wrapper:{
        paddingBottom: 50,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.primary,
        letterSpacing: 1.2,
        marginBottom: 5,
    },
    description:{
        fontSize: 14,
        color: Colors.gray,
        letterSpacing: 1.2,
        lineHeight: 30,
        marginBottom: 20,
    },
    socialLoginWrapper: {
        alignSelf: "stretch",
    },
    button: {
        flexDirection: "row",
        padding: 10,
        borderColor: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    buttonText: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: "500",
    },
    registerText: {
        fontSize: 14,
        color: Colors.black,
        marginTop: 30,
        lineHeight: 24,
    },
    registerTxtSpan: {
        color: Colors.primary,
        fontWeight: "600",
    },
});
