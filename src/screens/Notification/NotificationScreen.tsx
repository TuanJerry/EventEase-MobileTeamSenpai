import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import NotificationItem from "../../components/NotificationItem/NotificationItem";

const notifications = [
  {
    id: "1",
    type: "invite",
    title: "Lời mời tham gia sự kiện",
    message:
      "Nguyễn Bảo Khánh đã mời bạn tham gia sự kiện Workshop Thiết kế UI/UX.",
    createdAt: "2025-06-02T08:25:00Z",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "2",
    type: "reminder",
    title: "Nhắc nhở sự kiện sắp diễn ra",
    message: "Hội thảo Kỹ năng Lãnh đạo sẽ bắt đầu sau 30 phút.",
    createdAt: "2025-06-02T08:20:00Z",
  },
  {
    id: "3",
    type: "friend_joined",
    title: "Bạn bè đã tham gia sự kiện",
    message: "Minh Trang vừa tham gia sự kiện Festival Âm nhạc Mùa Hè.",
    createdAt: "2025-06-02T08:10:00Z",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "4",
    type: "update",
    title: "Cập nhật sự kiện",
    message: "Địa điểm tổ chức Workshop AI đã được thay đổi sang phòng B101.",
    createdAt: "2025-06-02T07:55:00Z",
  },
  {
    id: "5",
    type: "new_event",
    title: "Sự kiện mới dành cho bạn",
    message:
      "Khám phá sự kiện Marathon Sài Gòn 2025 – bạn có thể thích điều này!",
    createdAt: "2025-06-02T07:00:00Z",
  },
  {
    id: "6",
    type: "system",
    title: "Thông báo hệ thống",
    message:
      "Bạn đã hoàn tất hồ sơ người dùng. Hãy bắt đầu khám phá các sự kiện!",
    createdAt: "2025-06-02T06:00:00Z",
  },
  {
    id: "7",
    type: "invite",
    title: "Lời mời tham gia sự kiện",
    message: "Quốc Huy đã mời bạn đến Tech Talk: Lập trình Web hiện đại.",
    createdAt: "2025-06-02T05:30:00Z",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "8",
    type: "reminder",
    title: "Nhắc nhở",
    message: "Đừng quên sự kiện 'Yoga sáng chủ nhật' vào ngày mai lúc 7h.",
    createdAt: "2025-06-02T04:00:00Z",
  },
  {
    id: "9",
    type: "friend_joined",
    title: "Bạn bè tham gia sự kiện",
    message: "Lê Thảo My đã tham gia sự kiện Ẩm thực Chay Đường phố.",
    createdAt: "2025-06-02T03:00:00Z",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    id: "10",
    type: "new_event",
    title: "Sự kiện mới vừa được đăng",
    message: "Đêm nhạc Indie Underground – khám phá âm nhạc mới lạ!",
    createdAt: "2025-06-02T02:00:00Z",
  },
  {
    id: "11",
    type: "invite",
    title: "Lời mời tham gia sự kiện",
    message: "Trần Duy Nam đã mời bạn đến buổi Meetup Nhà Lãnh đạo Trẻ.",
    createdAt: "2025-06-02T01:30:00Z",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "12",
    type: "friend_joined",
    title: "Bạn bè đã tham gia sự kiện",
    message: "Phương Nhi vừa đăng ký tham gia Chuỗi Hội Thảo Công nghệ Xanh.",
    createdAt: "2025-06-02T01:00:00Z",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: "13",
    type: "update",
    title: "Cập nhật sự kiện",
    message: "Thời gian bắt đầu sự kiện Đọc sách Cùng Nhau đã được điều chỉnh.",
    createdAt: "2025-06-02T00:30:00Z",
  },
  {
    id: "14",
    type: "system",
    title: "Thông báo hệ thống",
    message: "Chúng tôi vừa cập nhật chính sách quyền riêng tư mới.",
    createdAt: "2025-06-02T00:00:00Z",
  },
  {
    id: "15",
    type: "reminder",
    title: "Nhắc nhở sự kiện",
    message: "Sự kiện 'Café Đàm Đạo Start-up' sẽ diễn ra trong 15 phút nữa.",
    createdAt: "2025-06-01T23:45:00Z",
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View className="h-full">
      <View className="flex-row items-center py-4 justify-center relative bg-white">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute left-4"
        >
          <Icon name="arrow-left" size={24} color={"#000"} />
        </Pressable>
        <Text className="font-semibold text-2xl">Thông báo</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotificationItem item={item} />}
      />
    </View>
  );
};

export default NotificationScreen;
