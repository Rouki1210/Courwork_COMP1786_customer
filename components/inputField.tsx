import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/Colors";

type Props = {};

const InputField = (props: Props) => {
    return (
        <TextInput placeholder='Email Address' placeholderTextColor={Colors.gray} style={styles.inputField} />
    );
}

export default InputField;

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignSelf: "stretch",
        borderRadius: 5,
        fontSize: 16,
        color: Colors.black,
        marginBottom: 20,
    },
});