import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { UrlTile } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.0285,
          longitude: 105.8542,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
});
