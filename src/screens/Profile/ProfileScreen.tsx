import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { User, BookText, Bookmark, CalendarDays, Inbox, LogOut } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../navigation/RootNavigator';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { UserProfile } from '../../types/user';
import { followerService } from "../../services/followerService";
import * as Sentry from "@sentry/react-native";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [followCount, setFollowCount] = useState({
    followingCount: 0,
    followersCount: 0
  });

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await userService.getMyProfile();
      setProfile(userData);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(
          "Phiên đăng nhập hết hạn",
          "Vui lòng đăng nhập lại",
          [
            {
              text: "OK",
              onPress: async () => {
                await authService.logout();
                setIsLoggedIn(false);
                navigation.replace("SignIn");
              }
            }
          ]
        );
      } 
      Sentry.withScope((scope) => {
        scope.setTag("user", "ProfileScreen");
        scope.setContext("api", { endpoint: "/users/my-info", method: "GET" });
        Sentry.captureException(error);
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowCount = async () => {
    try {
      setLoading(true);
      const response = await followerService.getFollowCount();
      setFollowCount(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchFollowCount();
  }, []);

  // Reload profile mỗi khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
      fetchFollowCount();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      navigation.replace("SignIn");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng xuất, vui lòng thử lại");
    }
  };

  if (loading || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff', padding: 20,}}>
      <View style={styles.header}>
        <Image 
          source={{ 
            uri: profile?.avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg' 
          }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>{profile ? `${profile.firstName} ${profile.lastName}` : 'Loading...'}</Text>
        <Text style={styles.birth}>{profile?.dateOfBirth || 'Loading...'}</Text>
        <View style={styles.emailBadge}>
          <Text style={styles.email}>{profile?.email || 'Loading...'}</Text>
        </View>
        <View style={styles.followRow}>
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>{followCount.followingCount}</Text>
            <Text style={styles.followLabel}>Theo dõi</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.followBox}>
            <Text style={styles.followNumber}>{followCount.followersCount}</Text>
            <Text style={styles.followLabel}>Bạn bè</Text>
          </View>
        </View>
      </View>

      {/* Menu items */}
      <MenuItem 
        icon={<User size={20} color="#000" />} 
        label="Thông tin cá nhân" 
        onPress={() => navigation.navigate('PersonalInfo')}
      />
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
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <LogOut size={18} color="#4B49C8" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ icon, label, onPress }: { readonly icon: React.ReactNode; readonly label: string; readonly onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
