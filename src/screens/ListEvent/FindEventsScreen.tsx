import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import EventCard from '../../components/Events/EventCard';
import NearbyEventsHeader from '../../components/Events/NearbyEventsHeader';


const mockEvents = [
    {
      id: '1',
      image: 'https://cdn.brvn.vn/editor/2023/03/A42_329308-chup-anh-su-kien-1_1677798711.jpg',
      date: '16-03-2025 08:00 AM',
      title: 'Này chủ nhật đỏ, hiến máu nhân đạo',
      location: 'Bệnh viện quận 7, phường Tân Hưng',
    },
    {
      id: '2',
      image: 'https://cdn.brvn.vn/topics/1280px/2023/329308_329308-chup-anh-su-kien-cover_1677799072.jpg',
      date: '17-03-2025 07:00 AM',
      title: 'Cùng nhau cuối tuần hoà cùng âm nhạc',
      location: 'The Coffee House, Nguyễn Văn Cừ',
    },
    {
      id: '3',
      image: 'https://dkentertainment.vn/wp-content/uploads/2023/01/Le-Hoi-Am-Nhac-Coach.jpg',
      date: '17-03-2025 09:00 AM',
      title: 'Phương pháp làm đẹp cho phụ nữ',
      location: 'Nhà văn hoá, phường Tân Định',
    },
    {
      id: '4',
      image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
      date: '18-03-2025 10:00 PM',
      title: 'Hội thảo giúp bé bước chân trưởng thành',
      location: 'Trung tâm văn hoá huyện Bình Chánh',
    },
    {
      id: '5',
      image: 'https://cdn.ahit.vn/maxoaudio/wp-content/uploads/2022/09/15121645/Coachella-su-kien-am-nhac-edm-1024x683.jpg',
      date: '21-06-2025 10:00 PM',
      title: 'Cuộc thi chạy marathon',
      location: 'Nhà thi đấu quận 7',
    },
    {
      id: '6',
      image: 'https://statics.vinpearl.com/le-hoi-edm-viet-nam-8_1668244530.jpg',
      date: '22-06-2025 10:15 AM',
      title: 'Ngày hội Mùa Xuân xanh',
      location: 'Công viên Gia Định',
    },
    {
      id: '7',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63d4lKL65FqZp7OlFzwKVvrkjm2ocCZpbh4nnDjU5x1zPcrclZbcG69dZHmmYtyO6_tY&usqp=CAU',
      date: '23-06-2025 02:00 PM',
      title: 'Hội chợ hướng nghiệp cho sinh viên',
      location: 'Trường Đại học Bách Khoa TPHCM',
    },
    {
      id: '8',
      image: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXc4zcNNXaSiozFDTf-A_HY-YBWkCeK7_x6-nueO0AmWZntuk0XfzhL2vQhR4nZJdjAZmRPTIWE15208TafOtF6y8-14ev0bBGcRnKZ1sU-dOf7_h0S8WLlVymHiWBvca3J903BTFw?key=T6jFU9a8HoKu-odAJPzHuBZo',
      date: '25-06-2025 08:00 AM',
      title: 'Workshop kỹ năng mềm',
      location: 'Không gian trẻ, Lê Thánh Tôn',
    },
    {
      id: '9',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgc0Lxk8KJTNSuVYubO8XMuYDeX6jUYpLhyxIdViigXySMa_W8h2GZlrZYRFSOiRPjvcQ&usqp=CAU',
      date: '27-06-2025 07:30 PM',
      title: 'Đêm nhạc cổ điển dưới trăng',
      location: 'Phòng trà Acoustic, Q.3',
    },
    {
      id: '10',
      image: 'https://image.nhandan.vn/w800/Uploaded/2025/igpcvcvjntc8510/2022_07_14/photo-7-1656493964692812714551-8127.jpg.webp',
      date: '30-06-2025 09:00 AM',
      title: 'Chương trình tình nguyện xanh',
      location: 'Xã Tân Thới Nhì, Hóc Môn',
    },
  ];
  

export default function FindEventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <NearbyEventsHeader
            title="Sự kiện gần bạn"
            onBackPress={() => console.log('Back')}
            onFilterPress={() => console.log('Bộ lọc')}
        />

        <FlatList
            data={mockEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <EventCard
                image={item.image}
                date={item.date}
                title={item.title}
                location={item.location}
            />
            )}
            contentContainerStyle={{ padding: 16 }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
});
