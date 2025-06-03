import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Phone, Lock, User, Image } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const PersonalInfoScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      icon: <Phone size={20} color="#000" />,
      label: 'Thay đổi số điện thoại',
      screen: 'ChangePhone',
    },
    {
      icon: <Lock size={20} color="#000" />,
      label: 'Thay đổi mật khẩu',
      screen: 'ChangePassword',
    },
    {
      icon: <User size={20} color="#000" />,
      label: 'Thay đổi thông tin cá nhân',
      screen: 'UpdateProfile',
    },
    {
      icon: <Image size={20} color="#000" />,
      label: 'Thay đổi ảnh đại diện',
      screen: 'ChangeAvatar',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Thông tin cá nhân</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});

export default PersonalInfoScreen; 