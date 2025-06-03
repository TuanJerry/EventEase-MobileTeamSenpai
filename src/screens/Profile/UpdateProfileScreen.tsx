import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { userService } from '../../services/userService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profile = await userService.getMyProfile();
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setDateOfBirth(new Date(profile.dateOfBirth));
      setEmail(profile.email);
      setLocation(profile.location || '');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải thông tin người dùng');
    }
  };

  const handleUpdateProfile = async () => {
    if (!firstName || !lastName || !email) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      setLoading(true);
      await userService.updateProfile({
        firstName,
        lastName,
        dateOfBirth: format(dateOfBirth, 'yyyy-MM-dd'),
        address: location,
        email
      });
      Alert.alert(
        'Thành công',
        'Thông tin cá nhân đã được cập nhật',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Lỗi', error.response?.data?.message || 'Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập họ"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputWrapper}>
            <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập tên"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar" size={20} color="#666" style={styles.inputIcon} />
            <Text style={styles.dateText}>
              {format(dateOfBirth, 'dd/MM/yyyy')}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputWrapper}>
            <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Địa chỉ</Text>
          <View style={styles.inputWrapper}>
            <Icon name="location-dot" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập địa chỉ"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
          </Text>
        </TouchableOpacity>
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
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#ff0000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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

export default UpdateProfileScreen; 