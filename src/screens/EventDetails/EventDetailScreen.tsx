import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParticipantsBox from '../../components/EventDetails/ParticipantsBox';
import { eventService } from '../../services/eventService';
import { Event } from '../../types/event';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function EventDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params as { eventId: string };
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState(0);
  const [joined, setJoined] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    fetchEventDetail();
  }, [eventId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (event?.images && event.images.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % event.images.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, event?.images]);

  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEventDetail(eventId);
      if (data) {
        setEvent(data);
        setParticipants(data.participantNumber);
        setError(null);
      } else {
        setError('Không tìm thấy thông tin sự kiện');
      }
    } catch (err) {
      setError('Không thể tải thông tin sự kiện');
      console.error('Error fetching event detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = () => {
    if (joined) {
      setParticipants((prev) => prev - 1);
    } else {
      setParticipants((prev) => prev + 1);
    }
    setJoined(!joined);
  };

  const renderImageItem = ({ item }: { item: { id: string; link: string } }) => (
    <Image
      source={{ uri: item.link }}
      style={[styles.bannerImage, { width: screenWidth }]}
      resizeMode="cover"
    />
  );

  const renderDots = () => {
    if (!event?.images) return null;
    return (
      <View style={styles.paginationContainer}>
        {event.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive
            ]}
          />
        ))}
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

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Không tìm thấy thông tin sự kiện'}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.retryButton, styles.backButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.retryText}>Quay về</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.retryButton} onPress={fetchEventDetail}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const startDate = formatDate(event.startTime);
  const endDate = formatDate(event.endTime);

  return (
    <ScrollView style={styles.container}> 
      {/* Banner + Tham gia box */}
      <View style={{ position: 'relative' }}>
        <FlatList
          ref={flatListRef}
          data={event?.images}
          renderItem={renderImageItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
            setCurrentIndex(newIndex);
          }}
          keyExtractor={(item) => item.id}
        />
        {renderDots()}

        <View style={styles.headerOverlay}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => console.log('Bookmark')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.participantWrapper}>
          <ParticipantsBox
            avatarUrls={[]}
            totalParticipants={participants}
            joined={joined}
            onJoinPress={handleJoin}
          />
        </View>
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.infoRow}>
            <View style={styles.iconWrapper}>
                <Ionicons name="calendar-outline" style={styles.icon} />
            </View>
            <View>
                <Text style={styles.infoTitle}>{startDate.date}</Text>
                <Text style={styles.infoSub}>{startDate.time} - {endDate.time}</Text>
            </View>
        </View>

        <View style={styles.infoRow}>
            <View style={styles.iconWrapper}>
                <Ionicons name="location-outline" style={styles.icon} />
            </View>
            <View>
                <Text style={styles.infoTitle}>Địa điểm</Text>
                <Text style={styles.infoSub}>{event.position}</Text>
            </View>
        </View>


        <View style={styles.infoRow}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/11.jpg' }}
            style={styles.organizerAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.organizerName}>Hoàng Vinh</Text>
            <Text style={styles.organizerRole}>Người tổ chức</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Theo dõi</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Thông tin sự kiện</Text>
        <Text style={styles.description}>{event.description}</Text>

        {event.hashtags.length > 0 && (
          <View style={styles.hashtagContainer}>
            {event.hashtags.map((tag) => (
              <View key={tag.id} style={styles.hashtag}>
                <Text style={styles.hashtagText}>{tag.name}</Text>
              </View>
            ))}
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  bannerImage: {
    height: 240,
  },
  headerOverlay: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
  participantWrapper: {
    position: 'absolute',
    bottom: 220,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  content: {
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    backgroundColor: '#EEF2FF', // nền nhạt
    padding: 8,
    borderRadius: 12,           // tạo khối tròn vuông
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  icon: {
    color: '#6366F1',           // màu tím nhạt
    fontSize: 20,
  },

  infoTitle: {
    fontWeight: '600',
    color: '#111827',
  },
  infoSub: {
    color: '#6B7280',
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  organizerName: {
    fontWeight: '600',
    color: '#111827',
  },
  organizerRole: {
    fontSize: 12,
    color: '#6B7280',
  },
  followButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  followButtonText: {
    color: '#6366F1',
    fontWeight: '500',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
    color: '#111827',
  },
  description: {
    color: '#4B5563',
    lineHeight: 20,
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
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  hashtag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hashtagText: {
    color: '#6366F1',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    backgroundColor: '#6B7280',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
