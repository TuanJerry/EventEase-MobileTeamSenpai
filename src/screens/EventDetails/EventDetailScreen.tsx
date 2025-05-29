import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParticipantsBox from '../../components/EventDetails/ParticipantsBox';
import { eventService } from '../../services/eventService';
import { Event, EventDetailResponse } from '../../types/event';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EventDetail: { eventId: string };
  UpcomingEvents: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EventDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { eventId } = route.params as { eventId: string };
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState(0);
  const [joined, setJoined] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [participateId, setParticipateId] = useState<string | null>(null);
  const [isTracked, setIsTracked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;
  const [isSelf, setIsSelf] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [relationshipId, setRelationshipId] = useState<string | null>(null);

  const fetchParticipantCount = async () => {
    try {
      console.log('=== Fetching Participant Count ===');
      const response = await eventService.getParticipantCount(eventId);
      console.log('Participant count response:', response);
      if (response.data && typeof response.data.count === 'number') {
        setParticipants(response.data.count);
      }
    } catch (err) {
      console.error('Error fetching participant count:', err);
    }
  };

  useEffect(() => {
    fetchEventDetail();
    checkParticipateStatus();
    checkFavoriteStatus();
    checkTrackStatus();
    fetchParticipantCount();
  }, [eventId]);

  useEffect(() => {
    if (event?.createdBy?.id) {
      checkSelfAndFollowStatus(event.createdBy.id);
    }
  }, [event?.createdBy?.id]);

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
      const response = await eventService.getEventDetail(eventId);
      console.log('Event detail response:', response);
      setEvent(response.data);
      setError(null);
    } catch (err) {
      setError('Không thể tải thông tin sự kiện');
      console.error('Error fetching event detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkParticipateStatus = async () => {
    try {
      console.log('=== Checking Participate Status ===');
      console.log('Event ID:', eventId);
      
      const response = await eventService.checkParticipate(eventId);
      console.log('Check Response:', response);
      
      setJoined(response.data.isParticipated);
    } catch (err) {
      console.error('Error checking participate status:', err);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const response = await eventService.checkFavorite(eventId);
      setIsFavorited(response.data.isFavourited);
    } catch (err) {
      console.error('Error checking favorite status:', err);
    }
  };

  const checkTrackStatus = async () => {
    try {
      console.log('=== Checking Track Status ===');
      console.log('Event ID:', eventId);
      
      const response = await eventService.checkTrack(eventId);
      console.log('Check Track Response:', response);
      
      setIsTracked(response.data.isTracked);
    } catch (err) {
      console.error('Error checking track status:', err);
    }
  };

  const checkSelfAndFollowStatus = async (userId: string) => {
    try {
      console.log('=== Checking Self and Follow Status ===');
      console.log('User ID:', userId);
      
      // 1. Kiểm tra có phải tài khoản của mình không
      const selfResponse = await eventService.checkSelf(userId);
      console.log('Self Response:', selfResponse);
      setIsSelf(selfResponse.data.isSelf);

      // 2. Nếu không phải tài khoản của mình, kiểm tra trạng thái theo dõi
      if (!selfResponse.data.isSelf) {
        const followResponse = await eventService.checkFollow(userId);
        console.log('Follow Response:', followResponse);
        setIsFollowing(followResponse.data.isFollow);
        if (followResponse.data.isFollow && followResponse.data.relationshipId) {
          setRelationshipId(followResponse.data.relationshipId);
        }
      }
    } catch (err) {
      console.error('Error checking self and follow status:', err);
    }
  };

  const handleJoin = async () => {
    try {
      console.log('=== Handle Join ===');
      console.log('Current joined status:', joined);
      
      if (joined) {
        console.log('Cancelling participation for event:', eventId);
        const response = await eventService.cancelParticipate(eventId);
        console.log('Cancel response:', response);
        
        if (response.status) {
          setJoined(false);
          fetchParticipantCount();
          Alert.alert('Thành công', 'Đã hủy tham gia sự kiện');
        }
      } else {
        console.log('Participating in event:', eventId);
        const response = await eventService.participateEvent(eventId);
        console.log('Participate response:', response);
        
        if (response.status) {
          setJoined(true);
          fetchParticipantCount();
          Alert.alert('Thành công', 'Đã tham gia sự kiện');
        }
      }
    } catch (err: any) {
      console.error('Error in handleJoin:', err);
      console.error('Error response:', err.response?.data);
      Alert.alert('Lỗi', err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        console.log('Unfavoriting event:', eventId);
        const response = await eventService.unfavoriteEvent(eventId);
        console.log('Unfavorite response:', response);
        if (response.status) {
          setIsFavorited(false);
          Alert.alert('Thành công', 'Đã xóa khỏi danh sách yêu thích');
        }
      } else {
        console.log('Favoriting event:', eventId);
        const response = await eventService.favoriteEvent(eventId);
        console.log('Favorite response:', response);
        if (response.status) {
          setIsFavorited(true);
          Alert.alert('Thành công', 'Đã thêm vào danh sách yêu thích');
        }
      }
    } catch (err: any) {
      console.error('Error in handleFavorite:', err);
      console.error('Error response:', err.response?.data);
      Alert.alert('Lỗi', err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleTrack = async () => {
    try {
      console.log('=== Handle Track ===');
      console.log('Current tracked status:', isTracked);
      
      if (isTracked) {
        console.log('Untracking event:', eventId);
        const response = await eventService.untrackEvent(eventId);
        console.log('Untrack response:', response);
        
        if (response.status) {
          setIsTracked(false);
          Alert.alert('Thành công', 'Đã hủy theo dõi sự kiện');
        }
      } else {
        console.log('Tracking event:', eventId);
        const response = await eventService.trackEvent(eventId);
        console.log('Track response:', response);
        
        if (response.status) {
          setIsTracked(true);
          Alert.alert('Thành công', 'Đã theo dõi sự kiện');
        }
      }
    } catch (err: any) {
      console.error('Error in handleTrack:', err);
      console.error('Error response:', err.response?.data);
      Alert.alert('Lỗi', err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleFollow = async () => {
    try {
      if (!event?.createdBy?.id) return;

      if (isFollowing) {
        // 4. Xử lý bỏ theo dõi
        console.log('=== Unfollow Process ===');
        console.log('User ID to unfollow:', event.createdBy.id);
        
        console.log('Calling unfollow API with user ID:', event.createdBy.id);
        const response = await eventService.unfollowUser(event.createdBy.id);
        console.log('Unfollow API Response:', response);
        
        if (response.status) {
          setIsFollowing(false);
          Alert.alert('Thành công', 'Đã hủy theo dõi người dùng');
        }
      } else {
        // 2. Xử lý theo dõi
        console.log('=== Follow Process ===');
        console.log('User ID to follow:', event.createdBy.id);
        
        const response = await eventService.followUser(event.createdBy.id);
        console.log('Follow API Response:', response);
        
        if (response.status) {
          // 3. Kiểm tra lại trạng thái theo dõi
          const followResponse = await eventService.checkFollow(event.createdBy.id);
          console.log('Check Follow Response:', followResponse);
          
          setIsFollowing(followResponse.data.isFollow);
          Alert.alert('Thành công', 'Đã theo dõi người dùng');
        }
      }
    } catch (err: any) {
      console.error('Error in handleFollow:', err);
      console.error('Error response:', err.response?.data);
      Alert.alert('Lỗi', err.response?.data?.message || 'Có lỗi xảy ra');
    }
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
    
    // Trừ 7 tiếng từ giờ UTC
    const vietnamTime = new Date(date.getTime() - (7 * 60 * 60 * 1000));
    
    // Format ngày tháng
    const formattedDate = vietnamTime.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
    
    // Format thời gian
    const hours = vietnamTime.getHours();
    const minutes = vietnamTime.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    return {
      date: formattedDate,
      time: time
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
          data={event.images}
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
            onPress={handleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={isFavorited ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={isFavorited ? "#F27830" : "#fff"} 
            />
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
          <View style={styles.iconWrapper}>
            <Ionicons name="people-outline" style={styles.icon} />
          </View>
          <View>
            <Text style={styles.infoTitle}>Số lượng tham gia</Text>
            <Text style={styles.infoSub}>Tối đa {event.participantNumber} người</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Image
            source={{ uri: event.createdBy.avatar }}
            style={styles.organizerAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.organizerName}>{event.createdBy.firstName} {event.createdBy.lastName}</Text>
            <Text style={styles.organizerRole}>Người tổ chức</Text>
          </View>
          {!isSelf && (
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={handleFollow}
            >
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Bỏ theo dõi' : 'Theo dõi'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>Thông tin sự kiện</Text>
        <Text style={styles.description}>{event.description}</Text>

        {event.hashtags && event.hashtags.length > 0 && (
          <View style={styles.hashtagContainer}>
            {event.hashtags.map((tag) => (
              <View key={tag.id} style={styles.hashtag}>
                <Text style={styles.hashtagText}>{tag.name}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.trackEventButton, isTracked && styles.trackedEventButton]}
          onPress={handleTrack}
        >
          <Ionicons 
            name={isTracked ? "calendar" : "calendar-outline"} 
            size={20} 
            color="#fff" 
            style={styles.trackEventIcon} 
          />
          <Text style={styles.trackEventText}>
            {isTracked ? 'Đang theo dõi' : 'Theo dõi sự kiện'}
          </Text>
        </TouchableOpacity>

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
    paddingBottom: 80,
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
  followingButton: {
    backgroundColor: '#F27830',
  },
  followButtonText: {
    color: '#6366F1',
    fontWeight: '500',
  },
  followingButtonText: {
    color: '#fff',
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
  trackEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B49C8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  trackedEventButton: {
    backgroundColor: '#F27830',
  },
  trackEventIcon: {
    marginRight: 8,
  },
  trackEventText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
