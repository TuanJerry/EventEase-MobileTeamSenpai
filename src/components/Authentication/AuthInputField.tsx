import React from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { SvgProps } from "react-native-svg";

interface InputFieldProps {
  placeholder: string;
  icon: React.FC<SvgProps>;
  isPassword?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
}

export default function InputField({
  placeholder,
  icon: Icon,
  isPassword = false,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  secureTextEntry,
  rightIcon,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Icon width={20} height={20} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ?? isPassword}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {rightIcon}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1A1A1A",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
