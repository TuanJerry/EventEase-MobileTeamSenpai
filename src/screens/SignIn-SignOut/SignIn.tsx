import React from "react";
import { View, Text, StyleSheet, Pressable} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import RememberPassword from "../../components/Authentication/AuthRemember";
import SocialButton from "../../components/Authentication/SocialButton";
import Button from "../../components/Authentication/AuthButton";
import InputField from "../../components/Authentication/AuthInputField";
import Logo from "../../../assets/Logo_2.svg";
import GoogleLogo from "../../../assets/Google.svg";
import FacebookLogo from "../../../assets/Facebook.svg";

export default function SignInScreen({ navigation, onLogin}) {
  return (
    <View style={styles.container}>
      <View style={styles.Logo}>
        <Logo width={61.55} height={60.18} />
        <Text style={styles.name}>EventEase</Text>
      </View>

      <Text style={styles.title}>Đăng nhập</Text>
      <InputField
        icon={() => <FontAwesome name="envelope" size={20} color="#888" />}
        placeholder="abc@gmail.com"
      />
      <InputField
        icon={() => <FontAwesome name="lock" size={20} color="#888" />}
        placeholder="Nhập mật khẩu"
        isPassword
      />

      <View style={styles.moreOptions}>
        <RememberPassword />
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.optionText}>Quên mật khẩu?</Text>
        </Pressable>
      </View>

      <Button
        title="       ĐĂNG NHẬP"
        onPress={() => {
          // Handle sign-in logic here
          console.log("Đăng nhập thành công");
          onLogin(); // Call the onLogin function to update the state
        }}
      />
      {/* 🔁 Đăng nhập bằng Google */}
      <Text style={styles.orText}>Hoặc</Text>
      <SocialButton 
         title="Đăng nhập bằng Google"
         icon={GoogleLogo}
         onPress={() => {
           // Handle Google sign-in logic here
           console.log("Đăng nhập bằng Google");
         }}
      />
      {/* 🔁 Đăng nhập bằng Facebook */}
      <SocialButton 
         title="     Đăng nhập bằng Facebook"
         icon={FacebookLogo}
         onPress={() => {
           // Handle Google sign-in logic here
           console.log("Đăng nhập bằng Facebook");
         }}
      />

      {/* 🔁 Đăng ký */}
      <View style={styles.signupRow}>
        <Text style = {styles.optionText} >Bạn chưa có tài khoản? </Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>Đăng ký</Text>
        </Pressable>
      </View>
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
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#000" },
    Logo: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 5,
    },
    name: {
        marginTop: 10,
        color: "#37364A",
        textAlign: "center",
        fontFamily: "Poppins",
        fontSize: 35,
        fontWeight: "bold",
        lineHeight: 35 * 1.382, // tương đương 138.2%
        marginBottom: 20,
    },
    moreOptions: {
        flexDirection: "row", // canh hàng ngang
        alignItems: "center", // canh giữa theo chiều dọc
        justifyContent: "space-between", // canh đều khoảng cách giữa các phần tử
        marginVertical: 10,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1A1A1A",
        fontWeight: "500",
    },
    orText: {
        textAlign: "center",
        marginVertical: 8,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        color: "#888",
    },
    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
    },
    signupText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#5668FD",
        fontWeight: "500",
    },
});

