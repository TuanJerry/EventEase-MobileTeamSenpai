import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderBack from "../../components/HeaderBackButton";
import InputField from "../../components/Authentication/AuthInputField";
import Button from "../../components/Authentication/AuthButton";
import Logo from "../../../assets/Logo_2.svg";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from "../../services/authService";

type ResetScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: {
    params: {
      email: string;
    };
  };
};

export default function ResetPasswordScreen({ navigation, route }: ResetScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = route.params;

  const validatePassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 8;

    return hasUpperCase && hasLowerCase && (hasNumber || hasSpecialChar) && isLongEnough;
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Lỗi",
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số hoặc ký tự đặc biệt và có độ dài tối thiểu 8 ký tự"
      );
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword(email, password, confirmPassword);
      Alert.alert("Thành công", response.message);
      navigation.navigate("SignIn");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra");
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
        <Text style={styles.name}>Đặt lại mật khẩu</Text>
      </View>

      {/* Mô tả ngắn */}
      <Text style={styles.description}>
        Tạo một mật khẩu mới, mạnh mà bạn chưa từng sử dụng trước đây.
      </Text>

      <InputField
        placeholder="Mật khẩu của bạn"
        isPassword
        icon={() => <FontAwesome name="lock" size={20} color="#888" />}
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ height: 10 }} />

      <InputField
        placeholder="Xác nhận mật khẩu"
        isPassword
        icon={() => <FontAwesome name="lock" size={20} color="#888" />}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Text style={styles.description}>
        Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số hoặc ký tự đặc biệt
      </Text>

      <View style={{ height: 100 }} />

      {/* Nút gửi */}
      <Button
        title="     GỬI"
        onPress={handleResetPassword}
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
