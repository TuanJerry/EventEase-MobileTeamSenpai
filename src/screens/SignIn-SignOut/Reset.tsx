import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderBack from "../../components/HeaderBackButton";
import InputField from "../../components/Authentication/AuthInputField";
import Button from "../../components/Authentication/AuthButton";
import Logo from "../../../assets/Logo_2.svg";

export default function ResetPasswordScreen({ navigation }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

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

      <View style={{height: 10}} />
     
      <InputField
          placeholder="Xác nhận mật khẩu"
          isPassword
          icon={() => <FontAwesome name="lock" size={20} color="#888" />}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
      />
      <Text style={styles.description}>
        Ít nhất 8 ký tự
      </Text>

      <View style={{ height: 100 }} />

      {/* Nút gửi */}
      <Button
        title="     GỬI"
        onPress={() => {
          // Xử lý đặt lại mật khẩu ở đây
          alert("Đã thay đổi mật khẩu")
          // navigation.navigate("SignIn");
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
