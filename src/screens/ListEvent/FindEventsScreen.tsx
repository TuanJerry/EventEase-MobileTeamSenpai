import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import EventCard from '../../components/Events/EventCard';
import NearbyEventsHeader from '../../components/Events/NearbyEventsHeader';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { SearchEvent } from '../../types/search.types';
import { HomeStackParamList } from '../../types/searchNavigation.types';
import { searchService } from '../../services/searchService';

type FindEventsScreenRouteProp = RouteProp<HomeStackParamList, 'FindEvents'>;
type FindEventsScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'FindEvents'>;

export default function FindEventsScreen() {
  const route = useRoute<FindEventsScreenRouteProp>();
  const navigation = useNavigation<FindEventsScreenNavigationProp>();
  const [events, setEvents] = useState<SearchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const searchEvents = async (page: number = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const searchQuery = route.params.searchQuery;
      if (!searchQuery) return;

      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        setError('Vui lòng đăng nhập để tìm kiếm sự kiện');
        return;
      }

      const response = await searchService.searchEvents(searchQuery, page);
      if (response.status) {
        if (page === 1) {
          setEvents(response.data.items);
        } else {
          setEvents(prev => [...prev, ...response.data.items]);
        }
        setHasMore(response.data.meta.currentPage < response.data.meta.totalPages);
      } else {
        setError('Không tìm thấy sự kiện');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
      } else {
        setError('Có lỗi xảy ra khi tìm kiếm sự kiện');
      }
      console.error('Search error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    searchEvents(1);
  }, [route.params.searchQuery]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      searchEvents(nextPage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const vietnamTime = new Date(date.getTime() - 7 * 60 * 60 * 1000);
    return vietnamTime.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetail', { eventId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NearbyEventsHeader
        title="Kết quả tìm kiếm"
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
              <Text style={styles.emptyText}>Không tìm thấy sự kiện nào</Text>
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
