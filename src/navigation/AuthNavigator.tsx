import React, { useContext, useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AuthContext } from "./RootNavigator";
import SignInScreen from "../screens/SignIn-SignOut/SignIn";
import SignUpScreen from "../screens/SignIn-SignOut/SignUp";
import ForgotPasswordScreen from "../screens/SignIn-SignOut/Forgot";
import VerifyCodeScreen from "../screens/SignIn-SignOut/Verify";
import ResetPasswordScreen from "../screens/SignIn-SignOut/Reset";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    setIsLoggedIn(true); // Example usage to update the state
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn">
        {(props) => <SignInScreen {...props} onLogin={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
