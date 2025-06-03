import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ManagePostsScreen from '../screens/Profile/ManagePostsScreen';
import FavoriteEventsScreen from '../screens/Profile/FavoriteEventsScreen';
import JoinedEventsScreen from '../screens/Profile/JoinedEventsScreen';
import TrackedEventsScreen from '../screens/Profile/TrackedEventsScreen';
import SignInScreen from '../screens/SignIn-SignOut/SignIn';
import EventDetailScreen from '../screens/EventDetails/EventDetailScreen';
import UpdateEventScreen from '../screens/CreateAndUpdateEvent/UpdateEventScreen';
import PersonalInfoScreen from '../screens/Profile/PersonalInfoScreen';
import ChangePhoneScreen from '../screens/Profile/ChangePhoneScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';
import UpdateProfileScreen from '../screens/Profile/UpdateProfileScreen';
import ChangeAvatarScreen from '../screens/Profile/ChangeAvatarScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="ManagePosts" component={ManagePostsScreen} />
      <Stack.Screen name="FavoriteEvents" component={FavoriteEventsScreen} />
      <Stack.Screen name="JoinedEvents" component={JoinedEventsScreen} />
      <Stack.Screen name="TrackedEvents" component={TrackedEventsScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="UpdateEvent" component={UpdateEventScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="ChangePhone" component={ChangePhoneScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="ChangeAvatar" component={ChangeAvatarScreen} />
    </Stack.Navigator>
  );
}
