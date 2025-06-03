import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import RememberPassword from "../../components/Authentication/AuthRemember";
import SocialButton from "../../components/Authentication/SocialButton";
import Button from "../../components/Authentication/AuthButton";
import InputField from "../../components/Authentication/AuthInputField";
import Logo from "../../../assets/Logo_2.svg";
import GoogleLogo from "../../../assets/Google.svg";
import FacebookLogo from "../../../assets/Facebook.svg";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from "../../services/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  onLogin?: () => void;
};

export default function SignInScreen({ navigation, onLogin }: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Kiểm tra xem có thông tin đăng nhập đã lưu không
    const checkSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');

        if (savedEmail && savedPassword && savedRememberMe === 'true') {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Lỗi khi đọc thông tin đăng nhập:', error);
      }
    };

    checkSavedCredentials();
  }, []);

  const handleRememberMe = async (value: boolean) => {
    setRememberMe(value);
    try {
      if (value) {
        // Lưu thông tin đăng nhập
        await AsyncStorage.multiSet([
          ['savedEmail', email],
          ['savedPassword', password],
          ['rememberMe', 'true']
        ]);
      } else {
        // Xóa thông tin đăng nhập đã lưu
        await AsyncStorage.multiRemove(['savedEmail', 'savedPassword', 'rememberMe']);
      }
    } catch (error) {
      console.error('Lỗi khi lưu thông tin đăng nhập:', error);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      // Lưu thông tin đăng nhập nếu rememberMe được bật
      if (rememberMe) {
        await AsyncStorage.multiSet([
          ['savedEmail', email],
          ['savedPassword', password],
          ['rememberMe', 'true']
        ]);
      }
      console.log("Đăng nhập thành công");
      onLogin?.();
    } catch (error: any) {
      Alert.alert(
        "Đăng nhập thất bại",
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.Logo}>
          <Logo width={61.55} height={60.18} />
          <Text style={styles.name}>EventEase</Text>
        </View>

        <Text style={styles.title}>Đăng nhập</Text>
        <InputField
          icon={() => <FontAwesome name="envelope" size={20} color="#888" />}
          placeholder="abc@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          icon={() => <FontAwesome name="lock" size={20} color="#888" />}
          placeholder="Nhập mật khẩu"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        <View style={styles.moreOptions}>
          <RememberPassword value={rememberMe} onValueChange={handleRememberMe} />
          <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.optionText}>Quên mật khẩu?</Text>
          </Pressable>
        </View>

        <Button
          title={loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
          onPress={handleSignIn}
          disabled={loading}
        />
        <Text style={styles.orText}>Hoặc</Text>
        <SocialButton 
           title="Đăng nhập bằng Google"
           icon={GoogleLogo}
           onPress={() => {
             console.log("Đăng nhập bằng Google");
           }}
        />
        <SocialButton 
           title="Đăng nhập bằng Facebook"
           icon={FacebookLogo}
           onPress={() => {
             console.log("Đăng nhập bằng Facebook");
           }}
        />

        <View style={styles.signupRow}>
          <Text style={styles.optionText}>Bạn chưa có tài khoản? </Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupText}>Đăng ký</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    mainContent: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    Logo: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
    },
    name: {
        marginTop: 5,
        color: "#37364A",
        textAlign: "center",
        fontFamily: "Poppins",
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 32 * 1.382,
        marginBottom: 5,
    },
    title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 12, 
        color: "#000" 
    },
    moreOptions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#1A1A1A",
        fontWeight: "500",
    },
    orText: {
        textAlign: "center",
        marginVertical: 6,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16,
        color: "#888",
    },
    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 'auto',
        marginBottom: 70,
    },
    signupText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#5668FD",
        fontWeight: "500",
    },
});

