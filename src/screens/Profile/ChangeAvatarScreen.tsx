import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { userService } from '../../services/userService';
import * as ImagePicker from 'expo-image-picker';
import * as Sentry from '@sentry/react-native';

const ChangeAvatarScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSelectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Cần quyền truy cập thư viện ảnh');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể truy cập ảnh');
    }
  };

  const handleUpdateAvatar = async () => {
    if (!avatar) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh đại diện');
      return;
    }

    try {
      setLoading(true);
      await userService.updateAvatar(avatar);
      Alert.alert(
        'Thành công',
        'Ảnh đại diện đã được cập nhật',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error: any) {
      Sentry.withScope((scope) => {
        scope.setTag("user", "ChangeAvatarScreen");
        scope.setContext("api", { endpoint: "/users/update-avatar", method: "PATCH" });
        Sentry.captureException(error);
      });
      Alert.alert('Lỗi', error.response?.data?.message || 'Không thể cập nhật ảnh đại diện');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Thay đổi ảnh đại diện</Text>
      </View>

      {/* Avatar Preview */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="user" size={50} color="#666" />
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSelectImage}
        >
          <Icon name="image" size={24} color="#4B7BE5" />
          <Text style={styles.actionButtonText}>Chọn ảnh từ thư viện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, (!avatar || loading) && styles.submitButtonDisabled]}
          onPress={handleUpdateAvatar}
          disabled={!avatar || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Cập nhật ảnh đại diện</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
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
  avatarContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#4B7BE5',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4B7BE5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChangeAvatarScreen; 