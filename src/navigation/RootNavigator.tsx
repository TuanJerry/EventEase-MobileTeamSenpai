import React, { useState, createContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import FriendScreen from "../screens/Friends/FriendScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
});

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const Stack = createStackNavigator();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(seen === "true");
      setIsLoading(false);
    };
    checkOnboarding();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          isLoggedIn ? "MainTabs" : hasSeenOnboarding ? "Login" : "Onboarding"
        }
      >
        {!isLoggedIn && (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={AuthNavigator} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen name="Friend" component={FriendScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
