import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ManagePostsScreen from '../screens/Profile/ManagePostsScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="ManagePosts" component={ManagePostsScreen} />
      {/* Thêm các màn hình khác của tab Profile nếu cần */}
    </Stack.Navigator>
  );
}
