import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import UpdateEventScreen from "./screens/CreateAndUpdateEvent/UpdateEventScreen";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{ flex: 1 }}>
        <UpdateEventScreen />
      </SafeAreaView> */}
      <StatusBar style="auto" />
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
