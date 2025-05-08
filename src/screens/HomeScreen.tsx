import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Sentry from "@sentry/react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
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

export default HomeScreen;
