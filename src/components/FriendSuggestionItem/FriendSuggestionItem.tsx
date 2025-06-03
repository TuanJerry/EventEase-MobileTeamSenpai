import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { getTimeAgo } from "../../utils/getTimeAgo";

export type FriendSuggestionProps = {
  id: string;
  avatar: string;
  name: string;
  mutualFriend: string;
  createdAt: string;
};

type Props = {
  item: FriendSuggestionProps;
};

const FriendSuggestionItem = ({ item }: Props) => {

  return (
    <View className="flex-row items-start px-4 py-3 bg-white">
      <Image
        source={{ uri: item.avatar }}
        className="w-12 h-12 rounded-full mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-base">
          <Text className="font-bold">{item.name}</Text> bạn bè chung với
        </Text>
        <Text className="text-base text-black">{item.mutualFriend}</Text>
        <View className="flex-row mt-3 gap-4">
          <TouchableOpacity className="border border-gray-300 rounded-lg px-7 py-2">
            <Text className="text-gray-500 font-semibold">Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#5669ff] rounded-lg px-6 py-2">
            <Text className="text-white font-semibold">Theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-sm text-gray-400">
        {getTimeAgo(item.createdAt)}
      </Text>
    </View>
  );
};

export default FriendSuggestionItem;
