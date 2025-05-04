import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { User, BookText, Bookmark, CalendarDays, Inbox, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';


export default function ProfileScreen() {

  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff', padding: 20,}}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/1/20/ngan-ngam-thay-ca-si-jack-j97-72912.jpg?width=0&s=ER3DsZM0IogAHY5-stcutw' }} style={styles.avatar} />
        <Text style={styles.name}>Nguyễn Cao Tuấn</Text>
        <Text style={styles.birth}>31/02/2003</Text>
        <View style={styles.emailBadge}>
          <Text style={styles.email}>tuancao.nguyen@gmail.com</Text>
        </View>
        <View style={styles.followRow}>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>350</Text>
            <Text style={styles.followLabel}>Theo dõi</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>346</Text>
            <Text style={styles.followLabel}>Bạn bè</Text>
          </View>
        </View>
      </View>

      {/* Menu items */}
      <MenuItem icon={<User size={20} color="#000" />} label="Thông tin cá nhân" />
      <MenuItem
        icon={<BookText size={20} color="#000" />}
        label="Quản lý bài đăng"
        onPress={() => navigation.navigate('ManagePosts')}
      />

      <MenuItem 
        icon={<Bookmark size={20} color="#000" />} 
        label="Sự kiện yêu thích" 
        onPress={() => navigation.navigate('FavoriteEvents')}
      />
      <MenuItem 
        icon={<CalendarDays size={20} color="#000" />} 
        label="Sự kiện đã tham gia" 
        onPress={() => navigation.navigate('JoinedEvents')}
      />
      <MenuItem 
        icon={<Inbox size={20} color="#000" />} 
        label="Sự kiện đang theo dõi" 
        onPress={() => navigation.navigate('TrackedEvents')}
      />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={18} color="#4B49C8" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ icon, label, onPress }: { icon: JSX.Element; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  birth: {
    color: '#666',
    marginTop: 2,
  },
  emailBadge: {
    backgroundColor: '#E5E4FE',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 8,
  },
  email: {
    color: '#4B49C8',
    fontWeight: '500',
    fontSize: 13,
  },
  followRow: {
    flexDirection: 'row',
    marginTop: 2,
    backgroundColor: '#fffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  followBox: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  followNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  followLabel: {
    fontSize: 13,
    color: '#666',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    height: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderColor: '#0000005A',
    borderWidth: 0.25,
  },
  menuLabel: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B49C8',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '50%',
  },
  logoutText: {
    color: '#4B49C8',
    fontWeight: '600',
    marginLeft: 6,
  },
});
