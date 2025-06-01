import { View, Text } from "react-native";
import React from "react";
import Logo from "../../../assets/Logo_2.svg";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {
  return (
    <View className="flex-1 flex-col items-center justify-center gap-56">
      <View className="flex-col items-center gap-5">
        <Logo width={80} height={80} />
        <Text className="text-4xl font-semibold">EventEase</Text>
      </View>
      <LottieView
        source={require("../../../assets/loading.json")} // Đường dẫn đến file JSON
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

export default LoadingScreen;
