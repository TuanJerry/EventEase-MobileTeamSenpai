import React from "react";
import { View, Text, StyleSheet} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderBack from "../../components/HeaderBackButton";
import InputField from "../../components/Authentication/AuthInputField";
import Button from "../../components/Authentication/AuthButton";
import Logo from "../../../assets/Logo_2.svg";

export default function ForgotPasswordScreen({ navigation }) {
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
        />

        <View style={{ height: 100 }} />

        {/* Nút gửi */}
        <Button
          title="     GỬI"
          onPress={() => {
            // Xử lý gửi email ở đây
            navigation.navigate("VerifyCode");
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
