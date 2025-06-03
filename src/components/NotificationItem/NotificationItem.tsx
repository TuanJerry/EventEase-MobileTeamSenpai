import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import type { FC } from "react";
import { getTimeAgo } from "../../utils/getTimeAgo";

export type NotificationItemProps = {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  avatar?: string;
};

// Icon tương ứng với từng loại thông báo
const getIconName = (type: string) => {
  switch (type) {
    case "invite":
      return "user-plus";
    case "reminder":
      return "clock";
    case "update":
      return "info";
    case "friend_joined":
      return "users";
    case "new_event":
      return "calendar";
    case "system":
      return "alert-circle";
    default:
      return "bell";
  }
};

const NotificationItem: FC<{ item: NotificationItemProps }> = ({ item }) => {
  return (
    <View className="flex-row px-4 py-3 items-start bg-white">
      <View className="w-12 h-12 mr-3 items-center justify-center">
        {item.avatar ? (
          <Image
            source={{ uri: item.avatar }}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Icon name={getIconName(item.type)} size={24} color="#5669ff" />
        )}
      </View>

      <View className="flex-1">
        <Text className="font-bold text-base text-black">{item.title}</Text>
        <Text className="text-sm text-gray-700 mt-1">{item.message}</Text>

      </View>
      <Text className="text-sm text-gray-400">
        {getTimeAgo(item.createdAt)}
      </Text>
    </View>
  );
};

export default NotificationItem;
