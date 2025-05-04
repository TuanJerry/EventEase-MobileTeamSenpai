import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SquarePen, ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'Này chủ nhật đỏ, hiến máu nhân đạo',
    date: '20/05/2025',
    location: 'Nhà Văn hóa Thanh Niên',
    tags: ['hiến máu', 'tình nguyện'],
    image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
  },
  {
    id: '2',
    title: 'Gặp nhau cuối tuần hoà cùng âm nhạc',
    date: '22/05/2025',
    location: 'Công viên Lê Văn Tám',
    tags: ['âm nhạc', 'cuối tuần'],
    image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
  },
  {
    id: '3',
    title: 'Cuộc thi chạy marathon',
    date: '25/05/2025',
    location: 'Phố đi bộ Nguyễn Huệ',
    tags: ['thể thao', 'marathon'],
    image: 'https://sukienvietsky.com/wp-content/uploads/2024/03/le-hoi-am-nhac-lon-nhat-nhi-the-gioi-3-8214.jpg',
  },
];

export default function ManagePostsScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>Ngày đăng: {item.date}</Text>
        <Text style={styles.location}>Địa điểm: {item.location}</Text>
        <View style={styles.tagsRow}>
          {item.tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Edit', item.id)}>
        <SquarePen size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
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
});
