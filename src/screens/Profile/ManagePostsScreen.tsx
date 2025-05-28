import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SquarePen, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { eventService } from '../../services/eventService';
import { Event } from '../../types/event';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EventDetail: { eventId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;

export default function ManagePostsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (page: number = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await eventService.getMyEvents(page);
      
      if (page === 1) {
        setEvents(response.data.items);
      } else {
        setEvents(prev => [...prev, ...response.data.items]);
      }

      setCurrentPage(page);
      setHasMore(response.data.meta.currentPage < response.data.meta.totalPages);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách sự kiện');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchEvents(currentPage + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleEventPress = (eventId: string) => {
    console.log('=== Event Details ===');
    console.log('Event ID:', eventId);
    console.log('Event URL:', `/event/${eventId}`);
    console.log('Navigation params:', { eventId });
    console.log('==================');
    navigation.navigate('EventDetail', { eventId });
  };

  const renderItem = ({ item }: { item: Event }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleEventPress(item.id)}
    >
      <Image 
        source={{ uri: item.images[0]?.link }} 
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>Ngày: {formatDate(item.startTime)}</Text>
        <Text style={styles.location}>Địa điểm: {item.position}</Text>
        <View style={styles.tagsRow}>
          {item.hashtags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => console.log('Edit', item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <SquarePen size={20} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4B49C8" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B49C8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchEvents(1)}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Sự kiện đã đăng</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshing={loading}
        onRefresh={() => fetchEvents(1)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
    color: '#FF3B30',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4B49C8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    gap: 10,
  },
  image: {
    width: 79,
    height: 79,
    borderRadius: 12,
    marginTop: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#E5E4FE',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#4B49C8',
    fontWeight: '500',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
