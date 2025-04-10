import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import SvgUri from 'react-native-svg-uri'

const Sign_in = ({ navigation }) => {
  {/* <View style={styles.container}>
      <Text style={styles.text}>Sign_in screen</Text>
      <Button title="Test navigation" onPress = {() => navigation.navigate("Home")} />
    </View> */}
  return (
    <View>
        <SvgUri width=62 height=61 source={require("../../assets/Logo.svg")} />
    </View>
  );
}

{/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
*/}

export default Sign_in
