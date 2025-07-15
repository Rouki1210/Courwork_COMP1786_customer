import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";


export const icon ={
    index : ({ color }: { color: string }) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    explore : ({ color }: { color: string }) => (
        <Ionicons name="search-outline" size={22} color={color} />
    ),
    notifications : ({ color }: { color: string }) => (
        <Ionicons name="notifications-outline" size={22} color={color} />
    ),
    cart : ({ color }: { color: string }) => (
        <Ionicons name="cart-outline" size={22} color={color} />
    ),
    profile : ({ color }: { color: string }) => (
        <Image source={{uri: 'https://avatars.akamai.steamstatic.com/087a48aab0d1f27af6c4e0dce8d9a071c2b3ec6f_full.jpg'}} style={styles.profileIcon} />
    )
}

const styles = StyleSheet.create({
    profileIcon: {
        width: 22,
        height: 22,
        borderRadius: 11,
    },
});