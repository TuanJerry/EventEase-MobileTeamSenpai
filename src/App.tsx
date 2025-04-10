import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Sign_in from './screens/Sign_in'

const Stack = createNativeStackNavigator();

function Home(){
    return (
        <View style={styles.container}>
           <Text>Open up App.tsx to start working on your app!</Text>
           <StatusBar style="auto" />
           <Button title="Sign_in screen" onPress= {() => navigation.navigate("Sign_in")} />
        </View>
    )
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Sign_in" component={Sign_in} />
    {/*        <Stack.Screen name="Sign_up" component={Sign_up} />
            <Stack.Screen name="Reset" component={Reset} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="Forgot" component={Forgot} /> */}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
