import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ParticipantsBox from "../../components/EventDetails/ParticipantsBox";
import { eventService } from "../../services/eventService";
import notificationService from "../../services/notificationService";
import { Event } from "../../types/event";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("window").width;
  const [isSelf, setIsSelf] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [relationshipId, setRelationshipId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchAllData = async () => {
    try {
      setIsInitialLoading(true);
      // Gọi tất cả API cùng lúc
      const [
        eventDetailResponse,
        participateResponse,
        favoriteResponse,
        trackResponse,
        participantCountResponse,
      ] = await Promise.all([
        eventService.getEventDetail(eventId),
        eventService.checkParticipate(eventId),
        eventService.checkFavorite(eventId),
        eventService.checkTrack(eventId),
        eventService.getParticipantCount(eventId),
      ]);

      // Cập nhật state với dữ liệu từ API
      setEvent(eventDetailResponse.data);
      setJoined(participateResponse.data.isParticipated);
      setIsFavorited(favoriteResponse.data.isFavourited);
      setIsTracked(trackResponse.data.isTracked);
      setParticipants(participantCountResponse.data.count);

      // Kiểm tra follow status nếu có event creator
      if (eventDetailResponse.data?.createdBy?.id) {
        const selfResponse = await eventService.checkSelf(
          eventDetailResponse.data.createdBy.id
        );
        setIsSelf(selfResponse.data.isSelf);

        if (!selfResponse.data.isSelf) {
          const followResponse = await eventService.checkFollow(
            eventDetailResponse.data.createdBy.id
          );
          setIsFollowing(followResponse.data.isFollow);
          if (
            followResponse.data.isFollow &&
            followResponse.data.relationshipId
          ) {
            setRelationshipId(followResponse.data.relationshipId);
          }
        }
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Không thể tải thông tin sự kiện");
    } finally {
      setIsInitialLoading(false);
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    try {
      if (joined) {
        const response = await eventService.cancelParticipate(eventId);
        if (response.status) {
          setJoined(false);
          const countResponse = await eventService.getParticipantCount(eventId);
          setParticipants(countResponse.data.count);
          Alert.alert("Thành công", "Đã hủy tham gia sự kiện");
        }
      } else {
        const response = await eventService.participateEvent(eventId);
        if (response.status) {
          setJoined(true);
          const countResponse = await eventService.getParticipantCount(eventId);
          setParticipants(countResponse.data.count);
          Alert.alert("Thành công", "Đã tham gia sự kiện");
        }
      }
    } catch (err: any) {
      console.error("Error in handleJoin:", err);
      Alert.alert("Lỗi", err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        const response = await eventService.unfavoriteEvent(eventId);
        if (response.status) {
          setIsFavorited(false);
          Alert.alert("Thành công", "Đã xóa khỏi danh sách yêu thích");
        }
      } else {
        const response = await eventService.favoriteEvent(eventId);
        if (response.status) {
          setIsFavorited(true);
          Alert.alert("Thành công", "Đã thêm vào danh sách yêu thích");
        }
      }
    } catch (err: any) {
      console.error("Error in handleFavorite:", err);
      Alert.alert("Lỗi", err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  // Load saved notification ID when component mounts
  useEffect(() => {
    const loadNotificationId = async () => {
      try {
        const savedId = await AsyncStorage.getItem(
          `event_notification_${eventId}`
        );
        if (savedId) {
          setNotificationId(savedId);
        }
      } catch (error) {
        console.error("Error loading notification ID:", error);
      }
    };
    loadNotificationId();
  }, [eventId]);

  const handleTrack = async () => {
    try {
      if (isTracked) {
        const response = await eventService.untrackEvent(eventId);
        if (response.status) {
          setIsTracked(false);
          // Cancel the scheduled notification if it exists
          if (notificationId) {
            await notificationService.cancelNotification(notificationId);
            // Remove from AsyncStorage
            await AsyncStorage.removeItem(`event_notification_${eventId}`);
            setNotificationId(null);
          }
          Alert.alert("Thành công", "Đã hủy theo dõi sự kiện");
        }
      } else {
        const response = await eventService.trackEvent(eventId);
        if (response.status) {
          setIsTracked(true);
          // Schedule notification 1 hour before the event
          if (event?.startTime) {
            const eventTime = new Date(event.startTime);
            const notificationTime = new Date(
              eventTime.getTime() - 60 * 60 * 1000
            ); // 1 hour before

            // Only schedule if the event hasn't started yet
            if (notificationTime > new Date()) {
              const notification =
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Nhắc nhở sự kiện",
                    body: `Sự kiện "${event.title}" sẽ bắt đầu trong 1 giờ!`,
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    data: { eventId: eventId }, // Store eventId in notification data
                  },
                  trigger: {
                    date: notificationTime,
                    channelId: "event-reminders",
                  },
                });
              // Save notification ID to AsyncStorage
              await AsyncStorage.setItem(
                `event_notification_${eventId}`,
                notification
              );
              setNotificationId(notification);
            }
          }
          Alert.alert("Thành công", "Đã theo dõi sự kiện");
        }
      }
    } catch (err: any) {
      console.error("Error in handleTrack:", err);
      Alert.alert("Lỗi", err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleFollow = async () => {
    try {
      if (!event?.createdBy?.id) return;

      if (isFollowing) {
        const response = await eventService.unfollowUser(event.createdBy.id);
        if (response.status) {
          setIsFollowing(false);
          Alert.alert("Thành công", "Đã hủy theo dõi người dùng");
        }
      } else {
        const response = await eventService.followUser(event.createdBy.id);
        if (response.status) {
          const followResponse = await eventService.checkFollow(
            event.createdBy.id
          );
          setIsFollowing(followResponse.data.isFollow);
          Alert.alert("Thành công", "Đã theo dõi người dùng");
        }
      }
    } catch (err: any) {
      console.error("Error in handleFollow:", err);
      Alert.alert("Lỗi", err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [eventId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (event?.images && event.images.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % event.images.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, event?.images]);

  const renderImageItem = ({
    item,
  }: {
    item: { id: string; link: string };
  }) => (
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
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    );
  };

  if (isInitialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B49C8" />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || "Không tìm thấy thông tin sự kiện"}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.retryButton, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryText}>Quay về</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAllData}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Trừ 7 tiếng từ giờ UTC
    const vietnamTime = new Date(date.getTime() - 7 * 60 * 60 * 1000);

    // Format ngày tháng
    const formattedDate = vietnamTime
      .toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");

    // Format thời gian
    const hours = vietnamTime.getHours();
    const minutes = vietnamTime.getMinutes();
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return {
      date: formattedDate,
      time: time,
    };
  };

  const startDate = formatDate(event.startTime);
  const endDate = formatDate(event.endTime);

  return (
    <ScrollView style={styles.container}>
      {/* Banner + Tham gia box */}
      <View style={{ position: "relative" }}>
        <FlatList
          ref={flatListRef}
          data={event.images}
          renderItem={renderImageItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / screenWidth
            );
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
            onPress={() => {
              handleFavorite();
            }}
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
            <Text style={styles.infoSub}>
              {startDate.time} - {endDate.time}
            </Text>
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
            <Text style={styles.infoSub}>
              Tối đa {event.participantNumber} người
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Image
            source={{ uri: event.createdBy.avatar }}
            style={styles.organizerAvatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.organizerName}>
              {event.createdBy.firstName} {event.createdBy.lastName}
            </Text>
            <Text style={styles.organizerRole}>Người tổ chức</Text>
          </View>
          {!isSelf && (
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollow}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
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
          style={[
            styles.trackEventButton,
            isTracked && styles.trackedEventButton,
          ]}
          onPress={handleTrack}
        >
          <Ionicons
            name={isTracked ? "calendar" : "calendar-outline"}
            size={20}
            color="#fff"
            style={styles.trackEventIcon}
          />
          <Text style={styles.trackEventText}>
            {isTracked ? "Đang theo dõi" : "Theo dõi sự kiện"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  bannerImage: {
    height: 240,
  },
  headerOverlay: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
  },

  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  participantWrapper: {
    position: "absolute",
    bottom: 220,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  content: {
    padding: 16,
    marginTop: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrapper: {
    backgroundColor: "#EEF2FF", // nền nhạt
    padding: 8,
    borderRadius: 12, // tạo khối tròn vuông
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    color: "#6366F1", // màu tím nhạt
    fontSize: 20,
  },

  infoTitle: {
    fontWeight: "600",
    color: "#111827",
  },
  infoSub: {
    color: "#6B7280",
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  organizerName: {
    fontWeight: "600",
    color: "#111827",
  },
  organizerRole: {
    fontSize: 12,
    color: "#6B7280",
  },
  followButton: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  followingButton: {
    backgroundColor: "#F27830",
  },
  followButtonText: {
    color: "#6366F1",
    fontWeight: "500",
  },
  followingButtonText: {
    color: "#fff",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
    color: "#111827",
  },
  description: {
    color: "#4B5563",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#FF3B30",
    marginBottom: 10,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#4B49C8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 8,
  },
  hashtag: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hashtagText: {
    color: "#6366F1",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    backgroundColor: "#6B7280",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  trackEventButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B49C8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  trackedEventButton: {
    backgroundColor: "#F27830",
  },
  trackEventIcon: {
    marginRight: 8,
  },
  trackEventText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
