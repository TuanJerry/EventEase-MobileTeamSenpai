/// <reference types="nativewind/types" />
declare module "*.svg" {
  import * as React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

type RootStackParamList = {
  MainTabs: undefined;
  Onboarding: undefined;
  Login: undefined;
  Friend: undefined;
  Notification: undefined;
};
