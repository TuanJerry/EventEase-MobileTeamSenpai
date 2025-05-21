import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Image,
    TextInputProps,
    TouchableOpacity,
} from "react-native";
import { SvgProps } from "react-native-svg";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type InputFieldProps = TextInputProps & {
    placeholder: string;
    icon: React.FC<SvgProps> | number; // SVG component hoặc require(image)
    isPassword?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
    icon: Icon,
    placeholder,
    isPassword = false,
    ...rest
}) => {
    const [isSecure, setIsSecure] = useState(isPassword);
    const [password, setPassword] = useState("");
    return (
      <View style={styles.inputContainer}>
        {typeof Icon === "function" ? (
          <Icon width={20} height={20} style={styles.icon} />
        ) : (
          <Image source={Icon} style={styles.icon} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888"
          {...rest}
          secureTextEntry={isSecure}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (rest.onChangeText) rest.onChangeText(text);
          }}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <FontAwesome
                name={isSecure ? "eye-slash" : "eye"}
                size={20}
                color="#888"
            />
          </TouchableOpacity>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        marginVertical: 6,
    },
    icon: {
        width: 20,
        marginLeft: 1,
        flex: 1,
        tintColor: "#888",
    },
    input: {
        marginLeft: 20,
        flex: 1,
        fontSize: 16,
        color: "#37364A",
    },
});

export default InputField;
