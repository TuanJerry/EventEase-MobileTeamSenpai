import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Calendar, MapPin, User, Plus } from "lucide-react-native";

// Screens
import HomeStackNavigator from "./HomeStackNavigator";
import CalendarScreen from "../screens/CalendarScreen";
import LocationScreen from "../screens/LocationScreen";
import ProfileStackNavigator from './ProfileStackNavigator';
import CreateEventScreen from "../screens/CreateAndUpdateEvent/CreateEventScreen";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -35,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View style={styles.addButton}>{children}</View>
  </TouchableOpacity>
);

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
          elevation: 0,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Home color={focused ? "#4B7BE5" : "#748c94"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Calendar color={focused ? "#4B7BE5" : "#748c94"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="AddEvent"
        component={CreateEventScreen}
        options={({ navigation }) => {
          const state = navigation.getState();
          const currentRoute = state.routes[state.index];
          const isFocused = currentRoute.name === "AddEvent";

          return {
            headerShown: false,
            tabBarIcon: () => <Plus color="#fff" size={30} />,
            tabBarButton: isFocused ? () => null : (props) => <CustomTabBarButton {...props} />,
          };
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MapPin color={focused ? "#4B7BE5" : "#748c94"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <User color={focused ? "#4B7BE5" : "#748c94"} size={24} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 65,
    height: 65,
    backgroundColor: "#4B7BE5",
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4B7BE5",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
