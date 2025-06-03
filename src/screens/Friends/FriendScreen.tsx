import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome6";
import FriendSuggestionItem, {
  FriendSuggestionProps,
} from "../../components/FriendSuggestionItem/FriendSuggestionItem";

const friendSuggestions: FriendSuggestionProps[] = [
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Thiện An",
    mutualFriend: "Nguyễn Bảo Khánh",
    createdAt: new Date(Date.now() - 30 * 1000).toISOString(), // dùng để test
  },
  {
    id: "2",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Minh Trang",
    mutualFriend: "Trần Hữu Đức",
    createdAt: "2025-06-02T08:59:55.000Z",
  },
  {
    id: "3",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Quốc Huy",
    mutualFriend: "Lê Thảo My",
    createdAt: "2025-06-02T08:59:50.000Z",
  },
  {
    id: "4",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Ngọc Mai",
    mutualFriend: "Vũ Hoàng Dương",
    createdAt: "2025-06-02T08:59:45.000Z",
  },
  {
    id: "5",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Trọng Nghĩa",
    mutualFriend: "Phạm Thuỳ Dương",
    createdAt: "2025-06-02T08:59:40.000Z",
  },
  {
    id: "6",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Thảo Vy",
    mutualFriend: "Ngô Thanh Hằng",
    createdAt: "2025-06-02T08:59:35.000Z",
  },
  {
    id: "7",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Hoàng Long",
    mutualFriend: "Đặng Quốc Bảo",
    createdAt: "2025-06-02T08:59:30.000Z",
  },
  {
    id: "8",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Phương Linh",
    mutualFriend: "Nguyễn Đan Thư",
    createdAt: "2025-06-02T08:59:25.000Z",
  },
  {
    id: "9",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Văn Lâm",
    mutualFriend: "Trịnh Anh Tú",
    createdAt: "2025-06-02T08:59:20.000Z",
  },
  {
    id: "10",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Bảo Ngọc",
    mutualFriend: "Phạm Anh Dũng",
    createdAt: "2025-06-02T08:59:15.000Z",
  },
  {
    id: "11",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Hữu Tài",
    mutualFriend: "Nguyễn Thị Lệ",
    createdAt: "2025-06-02T08:59:00.000Z", // 1 phút trước
  },
  {
    id: "12",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Mai Hương",
    mutualFriend: "Lê Gia Huy",
    createdAt: "2025-06-02T08:59:00.000Z",
  },
  {
    id: "13",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    name: "Công Danh",
    mutualFriend: "Nguyễn Trà My",
    createdAt: "2025-06-02T08:59:00.000Z",
  },
  {
    id: "14",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    name: "Thị Hằng",
    mutualFriend: "Trần Ngọc Mai",
    createdAt: "2025-06-02T08:58:00.000Z", // 2 phút trước
  },
  {
    id: "15",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Thanh Phong",
    mutualFriend: "Bùi Văn Nam",
    createdAt: "2025-06-02T08:58:00.000Z",
  },
  {
    id: "16",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    name: "Yến Nhi",
    mutualFriend: "Đặng Thuý Quỳnh",
    createdAt: "2025-06-02T08:58:00.000Z",
  },
  {
    id: "17",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    name: "Minh Nhật",
    mutualFriend: "Lê Hồng Anh",
    createdAt: "2025-06-02T08:57:00.000Z", // 3 phút trước
  },
  {
    id: "18",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    name: "Diệu Anh",
    mutualFriend: "Nguyễn Gia Linh",
    createdAt: "2025-06-02T08:57:00.000Z",
  },
  {
    id: "19",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    name: "Hải Đăng",
    mutualFriend: "Phạm Văn Phú",
    createdAt: "2025-06-02T08:57:00.000Z",
  },
  {
    id: "20",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    name: "Linh Chi",
    mutualFriend: "Nguyễn Thị Yến",
    createdAt: "2025-06-02T08:56:00.000Z", // 4 phút trước
  },
];

// const friendSuggestions: FriendSuggestionProps[] = [];
const FriendScreen = () => {
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
        <Text className="font-semibold text-2xl">Bạn bè có thể quen biết</Text>
      </View>

      <FlatList
        data={friendSuggestions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FriendSuggestionItem item={item} />}
      />
    </View>
  );
};

export default FriendScreen;
