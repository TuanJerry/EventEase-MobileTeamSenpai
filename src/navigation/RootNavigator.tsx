import React, { useState, createContext } from "react";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
});

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {isLoggedIn ? <BottomTabNavigator /> : <AuthNavigator />}
    </AuthContext.Provider>
  );
}
