// screens/JoinedEventsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import EventGroupList from '../../components/Profile/EventDateList';
import { eventService } from '../../services/eventService';
import { FavoriteEventGroup } from '../../types/event';

export default function JoinedEventsScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupedEvents, setGroupedEvents] = useState<FavoriteEventGroup[]>([]);

  useEffect(() => {
    fetchParticipatedEvents();
  }, []);

  const fetchParticipatedEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getParticipatedEvents();
      setGroupedEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách sự kiện đã tham gia');
      console.error('Error fetching participated events:', err);
    } finally {
      setLoading(false);
    }
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
        <TouchableOpacity style={styles.retryButton} onPress={fetchParticipatedEvents}>
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
        <Text style={styles.header}>Sự kiện đã tham gia</Text>
        <View style={{ width: 24 }} />
      </View>
      <EventGroupList 
        data={groupedEvents.map(group => ({
          date: new Date(group.createdAt).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          shortDate: (() => {
            const date = new Date(group.createdAt);
            return `${date.getDate()}\ntháng ${date.getMonth() + 1}`;
          })(),
          events: group.events.map(event => ({
            id: event.id,
            title: event.title,
            location: event.position,
            image: event.imagesMain
          }))
        }))} 
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});
