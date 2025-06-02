import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import HeaderBack from "../../components/HeaderBackButton";
import Button from "../../components/Authentication/AuthButton";
import Logo from "../../../assets/Logo_2.svg";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from "../../services/authService";

type VerifyScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: {
    params: {
      email: string;
    };
  };
};

export default function VerifyCodeScreen({ navigation, route }: VerifyScreenProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 phút = 300 giây
  const [canResend, setCanResend] = useState(false);
  const { email } = route.params;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = code.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ 6 số OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.verifyOTP(email, otpCode);
      if (response === true) {
        navigation.navigate("ResetPassword", { email });
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Mã OTP không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      setLoading(true);
      const response = await authService.forgotPassword(email);
      Alert.alert("Thành công", response.message);
      setCanResend(false);
      setCountdown(300); // Reset về 5 phút
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  return (
    <View style={styles.container}>
      <HeaderBack />

      <View style={styles.logoContainer}>
        <Logo width={45.55} height={44.18} />
        <Text style={styles.title}>Xác minh mã</Text>
      </View>

      <Text style={styles.description}>
        Một mã xác thực OTP đã được gửi đến email của bạn
      </Text>

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

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Không nhận được mã? </Text>
        <TouchableOpacity 
          onPress={handleResendOTP} 
          disabled={!canResend || loading}
        >
          <Text style={[
            styles.resendLink,
            !canResend && styles.resendLinkDisabled
          ]}>
            {canResend ? "Gửi lại" : `Gửi lại (${formatTime(countdown)})`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />

      <Button
        title="     GỬI"
        onPress={handleVerify}
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
    width: 45,
    height: 60,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 6,
    marginHorizontal: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#1A1A1A",
  },
  otpEmpty: {
    borderColor: "#3A3FFF",
  },
  resendContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "center",
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
  resendLinkDisabled: {
    color: "#888",
    textDecorationLine: "none",
  },
});
