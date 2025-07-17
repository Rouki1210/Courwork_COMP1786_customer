import { useCart } from "@/functions/cartContext";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { icon } from "../constants/Icons";



type Props = {
    onPress: Function;
    onLongPress: Function;
    isFocused: boolean;
    label: string;
    routeName: string;
};


const TabBarButton = (props: Props) => {
    const { cartItems } = useCart();

    const { onPress, onLongPress, isFocused, label, routeName } = props;
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarBtn}
        >
            {routeName === 'cart' && cartItems.length > 0 && (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
            )}
            {icon[routeName]({
                color: isFocused ? Colors.primary : '#00E5FF',
            })}
            <Text style={{ color: isFocused ? '#673ab7' : '#00E5FF' }}>
                {label}
            </Text>
        </Pressable>
    );
}

export default TabBarButton;

const styles = StyleSheet.create({
    tabBarBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    badgeContainer: {
        position: 'absolute',
        backgroundColor: Colors.highlight,
        top: -5,
        right: 15,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        zIndex: 10,
    },
    badgeText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
