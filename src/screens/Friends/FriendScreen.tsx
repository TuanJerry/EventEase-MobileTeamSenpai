import { View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome6";
import FriendSuggestionItem, {
  FriendSuggestionProps,
} from "../../components/FriendSuggestionItem/FriendSuggestionItem";
import { followerService } from "../../services/followerService";

const FriendScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [suggestions, setSuggestions] = useState<FriendSuggestionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleRemove = (id: string) => {
    setSuggestions(prev => prev.filter(item => item.id !== id));
  };

  const fetchSuggestedFollowers = async (pageNum: number = 1) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await followerService.getSuggestedFollowers(pageNum);
      const formattedSuggestions = response.data.map((item) => ({
        id: item.id,
        avatar: item.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
        name: item.name,
        mutualFriend: item.mutualFriend || "Không có bạn chung",
        createdAt: item.createdAt,
      }));

      if (pageNum === 1) {
        setSuggestions(formattedSuggestions);
      } else {
        setSuggestions(prev => {
          const existingIds = new Set(prev.map(item => item.id));
          const newItems = formattedSuggestions.filter(item => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
      }

      // Kiểm tra nếu số lượng item ít hơn 10 thì không còn dữ liệu để load
      setHasMore(formattedSuggestions.length === 10);
    } catch (err) {
      setError("Không thể tải danh sách gợi ý bạn bè");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSuggestedFollowers(nextPage);
    }
  };

  useEffect(() => {
    fetchSuggestedFollowers();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

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
        data={suggestions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FriendSuggestionItem item={item} onRemove={handleRemove} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-gray-500">Không có gợi ý bạn bè nào</Text>
          </View>
        }
        ListFooterComponent={
          loadingMore ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#4B7BE5" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default FriendScreen;
