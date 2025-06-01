import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {getDistrictsByCityName} from "../utils/getDistrictsByCityName"

const LocationScreen = () => {
const testFunc = async () => {
    const districts = await getDistrictsByCityName("Bến Tre");
    console.log(districts);
  };

  return (
    <View style={styles.container}>
      <Button title="Test" onPress={testFunc} ></Button>
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

export default LocationScreen;
