import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// import {createStackNavigator} from '@react-navigation/stack';
// import BottomTabNavigator from './navigation/BottomTabNavigator';
import RootNavigator from './navigation/RootNavigator';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://0f978f5a3ab12f9d05c405ae3bf2bf5f@o4509285998592000.ingest.us.sentry.io/4509286015500288',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// const Stack = createStackNavigator();

export default Sentry.wrap(function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar style="dark" translucent backgroundColor="transparent" />
          {/* <BottomTabNavigator /> */}
          <RootNavigator/>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});