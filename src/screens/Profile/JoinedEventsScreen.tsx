// screens/JoinedEventsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import EventGroupList from '../../components/Profile/EventDateList';

const joinedEvents = [

    {
        date: 'Ngày 16 tháng 03, 2025',
        shortDate: 'Tháng 3\n16',
        events: [
          {
            id: '1',
            title: 'Designers Meetup 2025',
            location: 'Trường Đại học Bách Khoa TP. Hồ Chí Minh',
            image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
          },
          {
            id: '2',
            title: 'Ngày hội việc làm',
            location: 'Trường Đại học Bách Khoa TP. Hồ Chí Minh',
            image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
          },
        ],
      },
      {
        date: 'Ngày 10 tháng 03, 2025',
        shortDate: 'Tháng 3\n10',
        events: [
          {
            id: '3',
            title: 'Designers Meetup 2025',
            location: 'Trường Đại học Bách Khoa TP. Hồ Chí Minh',
            image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
          },
          {
            id: '4',
            title: 'Ngày hội việc làm',
            location: 'Trường Đại học Bách Khoa TP. Hồ Chí Minh',
            image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
          },
        ],
      },
];

export default function JoinedEventsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Sự kiện đã tham gia</Text>
        <View style={{ width: 24 }} />
      </View>
      <EventGroupList data={joinedEvents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
