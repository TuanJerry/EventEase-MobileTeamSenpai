import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import EventCard from '../../components/Events/EventCard';
import NearbyEventsHeader from '../../components/Events/NearbyEventsHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/searchNavigation.types';
import { eventService } from '../../services/eventService';
import { SearchEvent } from '../../types/search.types';

type CurrentMonthEventsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CurrentMonthEvents'>;

export default function CurrentMonthEventsScreen() {
  const navigation = useNavigation<CurrentMonthEventsScreenNavigationProp>();
  const [events, setEvents] = useState<SearchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchCurrentMonthEvents = async (page: number = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await eventService.getCurrentMonthEvents(page);
      console.log('API Response:', response);
      
      if (response.status) {
        if (page === 1) {
          setEvents(response.data.items);
        } else {
          setEvents(prev => [...prev, ...response.data.items]);
        }
        setHasMore(response.data.meta.currentPage < response.data.meta.totalPages);
      } else {
        setError('Không tìm thấy sự kiện nào trong tháng');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải sự kiện trong tháng');
      console.error('Fetch current month events error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCurrentMonthEvents(1);
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCurrentMonthEvents(nextPage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetail', { eventId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NearbyEventsHeader
        title="Sự kiện trong tháng"
        onBackPress={() => navigation.goBack()}
        onFilterPress={() => console.log('Bộ lọc')}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a43ec" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              image={item.images[0]?.link}
              date={formatDate(item.startTime)}
              title={item.title}
              location={item.position}
              onPress={() => handleEventPress(item.id)}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không tìm thấy sự kiện nào trong tháng</Text>
            </View>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#4a43ec" />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingMoreContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
}); 