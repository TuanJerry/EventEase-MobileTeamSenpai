import { View, Text, Pressable } from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { SvgProps } from "react-native-svg";

export type OnboardingData = {
  id: string;
  title: string;
  description: string;
  illustration: React.FC<SvgProps>;
};

type OnboardingItemProps = {
  item: OnboardingData;
};

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  const height = (width * 322) / 375;

  return (
    <View
      className="flex-1 justify-end"
      style={{ backgroundColor: "#fbfbfb", width }}
    >
      <item.illustration width={width} height={height} />
    </View>
  );
};

export default OnboardingItem;
