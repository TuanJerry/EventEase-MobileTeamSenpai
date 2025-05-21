import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const RememberPassword = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#ccc", true: "#4C6EF5" }} // màu nền
        thumbColor={"#fff"} // màu nút tròn
        ios_backgroundColor="#ccc"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.label}>Lưu mật khẩu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // canh hàng ngang
    alignItems: "center", // canh giữa theo chiều dọc
    marginVertical: 8,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
  },
});

export default RememberPassword;
