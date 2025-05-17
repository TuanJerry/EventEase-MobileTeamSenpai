import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import HeaderBack from "../../components/HeaderBackButton";
import Button from "../../components/Authentication/AuthButton";
import Logo from "../../../assets/Logo_2.svg";

export default function VerifyCodeScreen({ navigation }) {
  // State quản lý 4 ô input OTP
  const [code, setCode] = useState(["", "", "", ""]);

  // Hàm xử lý nhập OTP
  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      // chỉ cho phép số
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Nếu nhập ký tự, tự động focus ô tiếp theo (nếu có)
      if (text && index < 3) {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  // Ref các ô input để focus điều khiển
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  return (
    <View style={styles.container}>
      {/* Quay lại */}
      <HeaderBack />

      {/* Logo và Tiêu đề */}
      <View style={styles.logoContainer}>
        <Logo width={45.55} height={44.18} />
        <Text style={styles.title}>Xác minh mã</Text>
      </View>

      {/* Mô tả ngắn */}
      <Text style={styles.description}>
        Một mã xác thực OTP đã được gửi đến email của bạn
      </Text>

      {/* OTP Input */}
      <View style={styles.otpContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, value === "" ? styles.otpEmpty : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            ref={ref => { inputRefs.current[index] = ref; }}
          />
        ))}
      </View>

      {/* Gửi lại */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Không nhận được mã? </Text>
        <TouchableOpacity onPress={() => alert("Gửi lại mã OTP")}>
          <Text style={styles.resendLink}>Gửi lại</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />

      {/* Nút gửi */}
      <Button
        title="     GỬI"
        onPress={() => {
          // Xử lý xác minh mã OTP ở đây
          alert("Xác minh mã OTP: " + code.join(""));
          navigation.navigate("ResetPassword"); // Nếu xác minh thành công
        }}
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 40,
  },
  title: {
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
    textAlign: "center",
  },
  otpContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 6,
    marginHorizontal: 15,
    textAlign: "center",
    fontSize: 22,
    color: "#1A1A1A",
  },
  otpEmpty: {
    borderColor: "#3A3FFF", // màu viền ô đang trống (theo hình)
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: "#888",
  },
  resendLink: {
    fontSize: 14,
    color: "#3A3FFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
