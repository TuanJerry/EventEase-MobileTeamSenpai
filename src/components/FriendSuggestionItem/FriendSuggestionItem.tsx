import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { followerService } from "../../services/followerService";

export type FriendSuggestionProps = {
  id: string;
  avatar: string;
  name: string;
  mutualFriend: string;
  createdAt: string;
};

type Props = {
  item: FriendSuggestionProps;
  onRemove: (id: string) => void;
};

const FriendSuggestionItem = ({ item, onRemove }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      if (isFollowing) {
        await followerService.unfollowUser(item.id);
      } else {
        await followerService.followUser(item.id);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="px-4 py-3 bg-white pl-[30px]">
      <View className="flex-row items-start">
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
        </View>
      </View>
      <Text className="text-sm text-gray-400 mt-2 pl-[55px]">
        Tham gia {formatDate(item.createdAt)}
      </Text>
      <View className="flex-row mt-3 gap-4">
        <TouchableOpacity 
          className="border border-gray-300 rounded-lg px-7 py-2"
          onPress={() => onRemove(item.id)}
        >
          <Text className="text-gray-500 font-semibold">Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`${isFollowing ? 'bg-gray-300' : 'bg-[#5669ff]'} rounded-lg px-6 py-2`}
          onPress={handleFollow}
          disabled={isLoading}
        >
          <Text className="text-white font-semibold">
            {isFollowing ? 'Hủy theo dõi' : 'Theo dõi'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FriendSuggestionItem;
