import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderBack from "../../components/HeaderBackButton";
import InputField from "../../components/Authentication/AuthInputField";
import Button from "../../components/Authentication/AuthButton";
import SocialButton from "../../components/Authentication/SocialButton";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from "../../services/authService";

import Logo from "../../../assets/Logo_2.svg";
import GoogleLogo from "../../../assets/Google.svg";
import FacebookLogo from "../../../assets/Facebook.svg";

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
      // Ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };

    const validateForm = () => {
      const newErrors: {[key: string]: string} = {};

      if (!firstName.trim()) {
        newErrors.firstName = "Vui lòng nhập tên";
      }

      if (!lastName.trim()) {
        newErrors.lastName = "Vui lòng nhập họ";
      }

      if (!username.trim()) {
        newErrors.username = "Vui lòng nhập tên đăng nhập";
      }

      if (!email.trim()) {
        newErrors.email = "Vui lòng nhập email";
      } else if (!validateEmail(email)) {
        newErrors.email = "Email không hợp lệ";
      }

      if (!password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      } else if (!validatePassword(password)) {
        newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async () => {
      if (!validateForm()) {
        return;
      }

      try {
        setLoading(true);
        const response = await authService.register({
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword
        });

        if (response.status) {
          Alert.alert("Thành công", response.message, [
            {
              text: "OK",
              onPress: () => navigation.navigate("SignIn")
            }
          ]);
        }
      } catch (error: any) {
        Alert.alert("Lỗi", error.message || "Có lỗi xảy ra khi đăng ký");
      } finally {
        setLoading(false);
      }
    };

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <HeaderBack />
          <View style={styles.Logo}>
            <Logo width={45.55} height={44.18} />
            <Text style={styles.name}>Đăng ký</Text>
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.nameField}>
              <InputField
                placeholder="Họ"
                icon={() => <FontAwesome name="user" size={20} color="#888" />}
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                  setErrors(prev => ({...prev, lastName: ''}));
                }}
                error={errors.lastName}
              />
            </View>
            <View style={styles.nameField}>
              <InputField
                placeholder="Tên"
                icon={() => <FontAwesome name="user" size={20} color="#888" />}
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                  setErrors(prev => ({...prev, firstName: ''}));
                }}
                error={errors.firstName}
              />
            </View>
          </View>

          <InputField
            placeholder="Tên đăng nhập"
            icon={() => <FontAwesome name="user" size={20} color="#888" />}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setErrors(prev => ({...prev, username: ''}));
            }}
            error={errors.username}
          />
          <InputField
            placeholder="Email"
            icon={() => <FontAwesome name="envelope" size={20} color="#888" />}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors(prev => ({...prev, email: ''}));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <InputField
            placeholder="Mật khẩu"
            isPassword
            icon={() => <FontAwesome name="lock" size={20} color="#888" />}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors(prev => ({...prev, password: ''}));
            }}
            error={errors.password}
            secureTextEntry={!showPassword}
            rightIcon={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome 
                  name={showPassword ? "eye-slash" : "eye"} 
                  size={20} 
                  color="#888" 
                />
              </Pressable>
            }
          />
          <InputField
            placeholder="Xác nhận mật khẩu"
            isPassword
            icon={() => <FontAwesome name="lock" size={20} color="#888" />}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors(prev => ({...prev, confirmPassword: ''}));
            }}
            error={errors.confirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <FontAwesome 
                  name={showConfirmPassword ? "eye-slash" : "eye"} 
                  size={20} 
                  color="#888" 
                />
              </Pressable>
            }
          />

          <View style={{ height: 10 }} />

          <Button 
            title={loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"} 
            onPress={handleSignUp}
            loading={loading}
          />

          <Text style={styles.orText}>Hoặc</Text>

          <SocialButton
            title="Đăng ký với Google"
            icon={GoogleLogo}
            onPress={() => console.log("Google sign up")}
          />

          <SocialButton
            title="Đăng ký với Facebook"
            icon={FacebookLogo}
            onPress={() => console.log("Facebook sign up")}
          />

          <View style={styles.signupRow}>
            <Text style={styles.optionText}>Bạn đã có tài khoản?</Text>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.signupText}>Đăng nhập</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    contentContainer: {
      padding: 24,
      paddingBottom: 40,
    },
    Logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 32,
      marginTop: 20,
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
      marginVertical: 12,
      fontSize: 16,
      color: "#888",
    },
    signupRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 8,
      marginBottom: 70,
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
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    nameField: {
      flex: 1,
    },
  });
