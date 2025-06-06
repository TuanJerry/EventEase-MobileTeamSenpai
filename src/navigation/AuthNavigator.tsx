import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./RootNavigator";
import SignInScreen from "../screens/SignIn-SignOut/SignIn";
import SignUpScreen from "../screens/SignIn-SignOut/SignUp";
import ForgotPasswordScreen from "../screens/SignIn-SignOut/Forgot";
import VerifyCodeScreen from "../screens/SignIn-SignOut/Verify";
import ResetPasswordScreen from "../screens/SignIn-SignOut/Reset";

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyCode: { email: string };
  ResetPassword: { email: string; code: string };
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
