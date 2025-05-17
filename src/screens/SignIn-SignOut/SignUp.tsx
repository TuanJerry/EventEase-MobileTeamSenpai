import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderBack from "../../components/HeaderBackButton";
import InputField from "../../components/Authentication/AuthInputField";
import Button from "../../components/Authentication/AuthButton";
import SocialButton from "../../components/Authentication/SocialButton";

import Logo from "../../../assets/Logo_2.svg";
import GoogleLogo from "../../../assets/Google.svg";
import FacebookLogo from "../../../assets/Facebook.svg";

export default function SignUpScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
      if (!fullName || !email || !password || !confirmPassword) {
        console.log("Vui lòng điền đầy đủ thông tin");
        return;
      }
      if (password !== confirmPassword) {
        console.log("Mật khẩu không khớp");
        return;
      }

      // Xử lý logic đăng ký ở đây
      console.log("Đăng ký thành công");
    };

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <HeaderBack />
          <View style={styles.Logo}>
            <Logo width={45.55} height={44.18} />
            <Text style={styles.name}>Đăng ký</Text>
          </View>

          <InputField
            placeholder="Họ và tên"
            icon={() => <FontAwesome name="user" size={20} color="#888" />}
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            placeholder="abc@email.com"
            icon={() => <FontAwesome name="envelope" size={20} color="#888" />}
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            placeholder="Nhập mật khẩu của bạn"
            isPassword
            icon={() => <FontAwesome name="lock" size={20} color="#888" />}
            value={password}
            onChangeText={setPassword}
          />
          <InputField
            placeholder="Xác nhận mật khẩu"
            isPassword
            icon={() => <FontAwesome name="lock" size={20} color="#888" />}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={{ height: 30 }} />

          <Button title="      ĐĂNG KÝ" onPress={handleSignUp} />

          <Text style={styles.orText}>Hoặc</Text>

          <SocialButton
            title="Đăng nhập với Google"
            icon={GoogleLogo}
            onPress={() => console.log("Google sign in")}
          />

          <SocialButton
            title="Đăng nhập với Facebook"
            icon={FacebookLogo}
            onPress={() => console.log("Facebook sign in")}
          />

          <View style={styles.signupRow}>
            <Text style={styles.optionText}>Bạn đã có tài khoản?</Text>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.signupText}>Đăng nhập</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      padding: 24,
      flexGrow: 1,
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
    orText: {
      textAlign: "center",
      marginVertical: 20,
      fontSize: 16,
      color: "#888",
    },
    signupRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 12,
    },
    optionText: {
      fontSize: 16,
      color: "#1A1A1A",
      fontWeight: "500",
    },
    signupText: {
      marginLeft: 10,
      fontSize: 16,
      color: "#5668FD",
      fontWeight: "500",
    },
  });
