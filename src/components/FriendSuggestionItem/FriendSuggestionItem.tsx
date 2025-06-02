import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { getTimeAgo } from "../../utils/getTimeAgo";
import Icon from "react-native-vector-icons/FontAwesome6";

export interface FriendSuggestionProps {
  id: string;
  avatar: string;
  name: string;
  mutualFriend: string;
  createdAt: string;
}

interface Props {
  item: FriendSuggestionProps;
  onFollow: () => void;
}

const FriendSuggestionItem: React.FC<Props> = ({ item, onFollow }) => {
  return (
    <View className="flex-row items-center p-4 border-b border-gray-200">
      <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-base">{item.name}</Text>
        {item.mutualFriend && (
          <Text className="text-gray-500 text-sm">
            Bạn chung: {item.mutualFriend}
          </Text>
        )}
      </View>
      <Pressable
        onPress={onFollow}
        className="bg-blue-500 px-4 py-2 rounded-full"
      >
        <Text className="text-white font-semibold">Theo dõi</Text>
      </Pressable>
    </View>
  );
};

export default FriendSuggestionItem;
