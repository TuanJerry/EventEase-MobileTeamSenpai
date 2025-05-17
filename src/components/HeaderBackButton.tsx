import React from "react";
import { Pressable, StyleSheet, Platform } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function HeaderBackButton({
  onPress,
}: {
  onPress?: () => void;
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={onPress || (() => navigation.goBack())}
      style={styles.backButton}
    >
      <Feather name="arrow-left" size={24} color="#1A1A1A" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 24,
    zIndex: 10,
  },
});
