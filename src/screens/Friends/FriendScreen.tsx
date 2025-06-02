import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome6";
import FriendSuggestionItem, {
  FriendSuggestionProps,
} from "../../components/FriendSuggestionItem/FriendSuggestionItem";
import { followerService } from "../../services/followerService";
import { RootStackParamList } from "../../types/navigation.types";

const FriendScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [suggestions, setSuggestions] = useState<FriendSuggestionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestedFollowers = async () => {
    try {
      setLoading(true);
      const response = await followerService.getSuggestedFollowers();
      if (response.status) {
        const formattedSuggestions = response.data.map((user) => ({
          id: user.id,
          avatar: user.avatar,
          name: `${user.name}`,
          mutualFriend: user.mutualFriend || "",
          createdAt: new Date().toISOString(),
        }));
        setSuggestions(formattedSuggestions);
      } else {
        setError("Không thể tải danh sách gợi ý bạn bè");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tải danh sách gợi ý bạn bè");
      console.error("Error fetching suggested followers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      const response = await followerService.followUser(userId);
      if (response.status) {
        // Remove the followed user from suggestions
        setSuggestions((prev) => prev.filter((user) => user.id !== userId));
      }
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  useEffect(() => {
    fetchSuggestedFollowers();
  }, []);

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

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">{error}</Text>
        </View>
      ) : (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FriendSuggestionItem
              item={item}
              onFollow={() => handleFollow(item.id)}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-gray-500">Không có gợi ý bạn bè nào</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default FriendScreen;
