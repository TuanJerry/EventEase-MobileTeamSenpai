import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderBack from "../../components/HeaderBackButton";
import InputField from "../../components/Authentication/AuthInputField";
import Button from "../../components/Authentication/AuthButton";
import Logo from "../../../assets/Logo_2.svg";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from "../../services/authService";

type ForgotScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function ForgotPasswordScreen({ navigation }: ForgotScreenProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleForgotPassword = async () => {
      // Reset error state
      setError("");

      // Validate empty email
      if (!email.trim()) {
        setError("Vui lòng nhập email của bạn");
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        setError("Email không hợp lệ. Vui lòng nhập đúng định dạng email");
        return;
      }

      try {
        setLoading(true);
        const response = await authService.forgotPassword(email);
        Alert.alert("Thành công", response.message);
        navigation.navigate("VerifyCode", { email });
      } catch (error: any) {
        const errorMessage = error.message || "Có lỗi xảy ra";
        setError(errorMessage);
        Alert.alert("Lỗi", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    return (
      <View style={styles.container}>
        {/* Quay lại */}
        <HeaderBack />

        {/* Logo và Tiêu đề */}
        <View style={styles.Logo}>
            <Logo width={45.55} height={44.18} />
            <Text style={styles.name}>Quên mật khẩu</Text>
        </View>

        {/* Mô tả ngắn */}
        <Text style={styles.description}>
          Quên mật khẩu? Đừng lo lắng, hãy nhập email của bạn để đặt lại mật
          khẩu hiện tại.
        </Text>

        {/* Input email */}
        <InputField
          icon={() => <FontAwesome name="envelope" size={20} color="#888" />}
          placeholder="abc@email.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(""); // Clear error when user types
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
        />

        <View style={{ height: 100 }} />

        {/* Nút gửi */}
        <Button
          title="GỬI"
          onPress={handleForgotPassword}
          loading={loading}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: "#fff",
    },
    Logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 32,
      marginTop: 40,
    },
    name: {
      color: "#1A1A1A",
      fontFamily: "Poppins",
      marginLeft: 12,
      fontSize: 32,
      fontWeight: "500",
    },
    description: {
      fontSize: 15,
      color: "#888",
      marginBottom: 24,
      lineHeight: 22,
    },
});
