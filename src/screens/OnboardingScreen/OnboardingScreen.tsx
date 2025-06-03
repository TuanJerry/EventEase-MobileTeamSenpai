import { View, Text, FlatList, Pressable, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Onboarding1 from "../../../assets/onboarding1.svg";
import Onboarding2 from "../../../assets/onboarding2.svg";
import Onboarding3 from "../../../assets/onboarding3.svg";
import OnboardingItem, {
  OnboardingData,
} from "../../components/Onboarding/OnboardingItem";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onboardingData: OnboardingData[] = [
  {
    id: "1",
    title: "Tìm sự kiện hoàn hảo – chỉ với vài thao tác!",
    description:
      "Cho dù bạn thích hòa nhạc hay hội thảo, chúng tôi sẽ giúp bạn khám phá những sự kiện phù hợp với sở thích của bạn và ở gần bạn.",
    illustration: Onboarding1,
  },
  {
    id: "2",
    title: "Khuyến nghị được cá nhân hóa dành riêng cho bạn",
    description:
      "Chúng tôi tìm hiểu sở thích, lịch trình và địa điểm của bạn để gợi ý những sự kiện phù hợp nhất — để bạn có thể tập trung vào niềm vui.",
    illustration: Onboarding2,
  },
  {
    id: "3",
    title: "Đừng bao giờ bỏ lỡ sự kiện mà bạn yêu thích!",
    description:
      "Theo dõi, lưu và nhận thông báo về các sự kiện thịnh hành. Mọi thứ bạn cần trong một ứng dụng thông minh.",
    illustration: Onboarding3,
  },
];

const OnboardingScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const fadeAnimTitle = useRef(new Animated.Value(0)).current; // Độ mờ của title
  const fadeAnimDescription = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // ví dụ điều hướng sang trang chính
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      navigation.navigate("Login");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.navigate("Login");
  };

  const renderItem = ({ item }: { item: OnboardingData }) => (
    <OnboardingItem item={item} />
  );

  const currentItem = onboardingData[currentIndex];
  const isLastSlide = currentIndex === onboardingData.length - 1;

  useEffect(() => {
    // Reset độ mờ về 0 trước khi fade-in
    fadeAnimTitle.setValue(0);
    fadeAnimDescription.setValue(0);

    // Fade-in cho title
    Animated.timing(fadeAnimTitle, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimDescription, {
      toValue: 1,
      duration: 500,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <View className="flex-1 bg-[#fbfbfb] flex-col flex-end gap-20">
      <FlatList
        data={onboardingData}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        bounces={false}
        ref={flatListRef}
        decelerationRate={0.9}
        snapToInterval={width}
        scrollEventThrottle={16}
        scrollEnabled={false}
      />

      {/* Fixed bottom purple section */}
      <View className="w-full bg-[#4f48ec] pt-12 pb-32 rounded-t-[40] items-center px-14">
        <Animated.Text
          className="text-center text-3xl text-white mb-4 leading-9"
          style={{ minHeight: 72, opacity: fadeAnimTitle }} // Áp dụng fade cho title
        >
          {currentItem?.title}
        </Animated.Text>

        <Animated.Text
          className="text-center text-xl text-[#b7b5f6] leading-7"
          style={{ minHeight: 112, opacity: fadeAnimDescription }} // Áp dụng fade cho description
        >
          {currentItem?.description}
        </Animated.Text>

        {/* Navigation bar */}
        <View className="absolute bottom-20 flex-row justify-between items-center w-full">
          <Pressable
            onPress={isLastSlide ? null : handleSkip}
            style={{ opacity: isLastSlide ? 0 : 1 }}
          >
            <Text className="text-[#b7b5f6] text-xl font-medium">Bỏ qua</Text>
          </Pressable>
          <View className="flex-row">
            {onboardingData.map((_, index) => (
              <View
                key={index}
                className={`w-[10] h-[10] mx-[5] rounded-full ${
                  index == currentIndex ? "bg-[#fff]" : "bg-[#726cef]"
                }`}
              />
            ))}
          </View>
          <Pressable onPress={handleNext}>
            <Text className="text-white text-xl font-semibold">
              {isLastSlide ? "Bắt đầu" : "Kế tiếp"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
