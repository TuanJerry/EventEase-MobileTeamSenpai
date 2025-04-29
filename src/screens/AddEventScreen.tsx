import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddEventScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add Event Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddEventScreen;
