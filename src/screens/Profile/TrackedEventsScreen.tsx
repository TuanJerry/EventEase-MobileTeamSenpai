import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import EventCard from '../../components/Events/EventCard';
import NearbyEventsHeader from '../../components/Events/NearbyEventsHeader';
import { eventService } from '../../services/eventService';
import { FavoriteEvent, FavoriteEventGroup } from '../../types/event';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EventDetail: { eventId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;

export default function TrackedEventsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [events, setEvents] = useState<FavoriteEvent[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchEvents = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await eventService.getTrackedEvents(pageNumber);

      const newEvents = response.data.events.flatMap(
        (trackedEvent: FavoriteEventGroup) => trackedEvent.events
      );

      if (pageNumber === 1) {
        setEvents(newEvents);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      }

      setHasMore(newEvents.length === limit);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh danh sách mỗi khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      setPage(1); // Reset về trang 1
      fetchEvents(1);
    }, [])
  );

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchEvents(nextPage);
    }
  };

  const handleEventPress = (event: FavoriteEvent) => {
    console.log("=== Event Details ===");
    console.log("Event ID:", event.eventId);
    console.log("Event URL:", `/event/${event.eventId}`);
    console.log("Navigation params:", { eventId: event.eventId });
    console.log("==================");
    navigation.navigate("EventDetail", { eventId: event.eventId });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NearbyEventsHeader
        title="Đang theo dõi"
        onFilterPress={() => console.log("Bộ lọc")}
      />

      <FlatList
        data={events}
        keyExtractor={(item) => item.eventId}
        renderItem={({ item }) => (
          <EventCard
            image={item.imagesMain}
            date={new Date(item.startTime).toLocaleString("vi-VN")}
            title={item.title}
            location={item.position}
            onPress={() => handleEventPress(item)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
