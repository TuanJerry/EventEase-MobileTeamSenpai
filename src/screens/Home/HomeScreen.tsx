import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import EventList from "../../components/EventList/EventList";
import BoyArt from "../../../assets/boy-clipart.svg";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNotification } from "../../hooks/useNotification";

const mockEventsList = {
  title: "Sự kiện gần bạn",
  events: [
    {
      id: 1,
      backgroundImage:
        "https://cdn.brvn.vn/topics/1280px/2023/329308_329308-chup-anh-su-kien-cover_1677799072.jpg",
      date: "16-03-2025 08:00 AM",
      title: "Ngày chủ nhật đỏ, hiến máu nhân đạo",
      location: "Bệnh viện quận 7, phường Tân Hưng",
      avatars: [
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/45.jpg",
        "https://randomuser.me/api/portraits/men/46.jpg",
        "https://randomuser.me/api/portraits/men/47.jpg",
        "https://randomuser.me/api/portraits/women/48.jpg",
      ],
      totalParticipants: 686,
    },
    {
      id: 2,
      backgroundImage:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
      date: "25-03-2025 09:30 AM",
      title: "Chiến dịch làm sạch bờ biển",
      location: "Bãi biển Cần Giờ",
      avatars: [
        "https://randomuser.me/api/portraits/women/33.jpg",
        "https://randomuser.me/api/portraits/men/34.jpg",
      ],
      totalParticipants: 120,
    },
    {
      id: 3,
      backgroundImage:
        "https://bqlrbinhchanhcuchi.org.vn/public/img/news/noimage.jpg",
      date: "05-04-2025 02:00 PM",
      title: "Trồng cây gây rừng",
      location: "Rừng phòng hộ Bình Chánh",
      avatars: [
        "https://randomuser.me/api/portraits/men/20.jpg",
        "https://randomuser.me/api/portraits/women/21.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
      ],
      totalParticipants: 200,
    },
  ],
};

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <SearchBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mt-4 pb-4"
      >
        <EventList {...mockEventsList} />
        <View className="relative bg-[#d6feff] rounded-3xl m-4 flex-column items-start gap-4 py-6 px-12">
          <Text className="font-semibold text-2xl">Tìm bạn bè</Text>
          <Text className="text-base">Tìm bạn để không bị bỏ lỡ</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            className="justify-center items-center bg-[#00f8ff] px-7 py-3 rounded-lg"
            onPress={() => navigation.push("Friend")}
          >
            <Text className="text-white">GỢI Ý</Text>
          </TouchableOpacity>
          <View className="absolute top-0 right-[-27]">
            <BoyArt width={120} style={{ height: "100%" }} />
          </View>
        </View>
        <EventList {...mockEventsList} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
