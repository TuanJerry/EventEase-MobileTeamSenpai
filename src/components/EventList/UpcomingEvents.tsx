import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/searchNavigation.types';
import Icon from 'react-native-vector-icons/FontAwesome6';

type UpcomingEventsNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'EventDetail'>;

interface UpcomingEvent {
  id: string;
  title: string;
  startTime: string;
  position: string;
  images: { id: string; link: string }[];
}

interface UpcomingEventsProps {
  events: UpcomingEvent[];
  onLoadMore: () => void;
  loading: boolean;
}

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 48 = padding (16) * 2 + gap (16)

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, onLoadMore, loading }) => {
  const navigation = useNavigation<UpcomingEventsNavigationProp>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetail', { eventId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sự kiện sắp tới</Text>
      <View style={styles.gridContainer}>
        {events.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.eventCard}
            onPress={() => handleEventPress(item.id)}
          >
            <Image 
              source={{ uri: item.images[0]?.link }} 
              style={styles.eventImage}
              resizeMode="cover"
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventDate}>{formatDate(item.startTime)}</Text>
              <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
              <View style={styles.locationContainer}>
                <Icon name="location-dot" size={12} color="#9594a4" />
                <Text style={styles.locationText} numberOfLines={1}>{item.position}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải thêm...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventCard: {
    width: itemWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventInfo: {
    padding: 12,
  },
  eventDate: {
    fontSize: 12,
    color: '#f0635a',
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#9594a4',
    marginLeft: 4,
    flex: 1,
  },
  loadingContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default UpcomingEvents; 