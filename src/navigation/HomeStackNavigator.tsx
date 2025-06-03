import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import FindEventsScreen from '../screens/ListEvent/FindEventsScreen';
import EventDetailScreen from '../screens/EventDetails/EventDetailScreen';
import NearbyEventsScreen from '../screens/ListEvent/NearbyEventsScreen';
import CurrentMonthEventsScreen from '../screens/ListEvent/CurrentMonthEventsScreen';
import { HomeStackParamList } from '../types/searchNavigation.types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          gestureEnabled: false
        }}
      />
      <Stack.Screen name="FindEvents" component={FindEventsScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="NearbyEvents" component={NearbyEventsScreen} />
      <Stack.Screen name="CurrentMonthEvents" component={CurrentMonthEventsScreen} />
    </Stack.Navigator>
  );
} 