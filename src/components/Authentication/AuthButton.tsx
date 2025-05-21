import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ActivityIndicator,
    GestureResponderEvent,
    } from "react-native";
import { SvgProps } from "react-native-svg";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type PrimaryButtonProps = {
    title: string;
    icon?: React.FC<SvgProps>;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    title,
    icon: None,
    onPress,
    disabled = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, (disabled || loading) && styles.disabled]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled || loading}
        >
        <View style={styles.innerContent}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.iconWrapper}>
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <FontAwesome name="arrow-right" size={15} color="#fff" />
            )}
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4C6EF5",
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: "auto",
        width: "80%",
    },
    disabled: {
        backgroundColor: "#B0B8FF",
    },
    innerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // giúp icon nằm rìa phải
    },
    text: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Poppins",
        fontWeight: "bold",
        textAlign: "center",
    },
    iconWrapper: {
        backgroundColor: "#3B5BDB",
        padding: 10,
        borderRadius: 50,
    },
});

export default PrimaryButton;
