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

type SocialButtonProps = {
    title: string;
    icon?: React.FC<SvgProps>;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean;
};

const PrimaryButton: React.FC<SocialButtonProps> = ({
    title,
    icon: Icon,
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
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                Icon && <Icon width={25} height={25}/>
            )}
            <Text style={styles.text}>{title}</Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: "auto",
    width: "80%",
    marginBottom: 16,
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
    color: "#1C1B1F",
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
