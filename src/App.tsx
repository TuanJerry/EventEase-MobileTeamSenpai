import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import "../global.css"; // Import global styles

// import {createStackNavigator} from '@react-navigation/stack';
// import BottomTabNavigator from './navigation/BottomTabNavigator';
import RootNavigator from "./navigation/RootNavigator";
import * as Sentry from "@sentry/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import notificationService from "./services/notificationService";
import * as Notifications from "expo-notifications";

Sentry.init({
  dsn: "https://0f978f5a3ab12f9d05c405ae3bf2bf5f@o4509285998592000.ingest.us.sentry.io/4509286015500288",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// const Stack = createStackNavigator();

export default Sentry.wrap(function App() {
  useEffect(() => {
    // Initialize notification service
    const initNotifications = async () => {
      await notificationService.configure();
      // Request permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permissions not granted");
      }
    };

    initNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <SafeAreaView
              style={styles.container}
              edges={["top", "left", "right"]}
            >
              <StatusBar
                style="dark"
                translucent
                backgroundColor="transparent"
              />
              <RootNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
