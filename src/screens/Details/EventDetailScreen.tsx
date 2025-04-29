// src/screens/EventDetailScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParticipantsBox from '../../components/EventDetails/ParticipantsBox';

export default function EventDetailScreen() {
    const avatarUrls = [
        'https://randomuser.me/api/portraits/women/44.jpg',
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/men/75.jpg',
      ];
      
      const [participants, setParticipants] = useState(686);
      const [joined, setJoined] = useState(false);
    
      const handleJoin = () => {
        if (joined) {
          setParticipants((prev) => prev - 1);
        } else {
          setParticipants((prev) => prev + 1);
        }
        setJoined(!joined);
      };

  return (
    <ScrollView style={styles.container}> 
      {/* Banner + Tham gia box */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: 'https://image.nhandan.vn/w800/Uploaded/2025/igpcvcvjntc8510/2022_07_14/photo-7-1656493964692812714551-8127.jpg.webp' }}
          style={styles.bannerImage}
        />

        <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Go back')}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Bookmark')}>
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </View>


        <View style={styles.participantWrapper}>
            <ParticipantsBox
                avatarUrls={avatarUrls}
                totalParticipants={participants}
                joined={joined}
                onJoinPress={handleJoin}
            />
        </View>
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.title}>Tìm kiếm tài năng Bách Khoa HCMUT</Text>

        <View style={styles.infoRow}>
            <View style={styles.iconWrapper}>
                <Ionicons name="calendar-outline" style={styles.icon} />
            </View>
            <View>
                <Text style={styles.infoTitle}>15/03/2025</Text>
                <Text style={styles.infoSub}>Thứ 7, 4:00PM - 9:00PM</Text>
            </View>
        </View>

        <View style={styles.infoRow}>
            <View style={styles.iconWrapper}>
                <Ionicons name="location-outline" style={styles.icon} />
            </View>
            <View>
                <Text style={styles.infoTitle}>Bach Khoa Got Talent</Text>
                <Text style={styles.infoSub}>268 D. Lý Thường Kiệt, P.14, Q.10, TP.HCM</Text>
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
        <Text style={styles.description}>
            Tìm kiếm tài năng Bách Khoa là một hoạt động thường niên nhằm khám phá và tôn vinh những cá nhân xuất sắc trong cộng đồng sinh viên. 
            Sự kiện không chỉ là sân chơi để các bạn thể hiện kỹ năng, mà còn là cơ hội để phát triển bản thân qua các phần thi hấp dẫn và mang tính thực tiễn cao. 
            {"\n\n"}
            Với các lĩnh vực như ca hát, nhảy múa, diễn thuyết, lập trình, thiết kế, nghiên cứu khoa học, và khởi nghiệp, chương trình tạo điều kiện cho các tài năng được thể hiện trước hội đồng chuyên môn và khán giả rộng rãi.
            {"\n\n"}
            Ngoài việc tranh tài, các thí sinh còn được hỗ trợ huấn luyện, mentoring bởi các chuyên gia uy tín và có cơ hội kết nối, hợp tác với các doanh nghiệp, tổ chức lớn. 
            Đây chính là nơi khởi nguồn cho những ý tưởng sáng tạo, những bước tiến mới và cũng là nơi tạo nên sự lan toả mạnh mẽ trong cộng đồng sinh viên yêu thích sự thử thách và đổi mới.
        </Text>

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
    width: '100%',
    height: 240
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
});
