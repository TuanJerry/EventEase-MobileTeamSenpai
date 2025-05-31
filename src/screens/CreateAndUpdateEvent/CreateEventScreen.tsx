import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EventFormData } from '../../types/event.d'; 
import { eventService } from '../../services/eventService';
import EventImagePicker from '../../components/EventForm/EventImagePicker';
import TagSelector from '../../components/EventForm/TagSelector';
import DateTimePickerGroup from '../../components/EventForm/DateTimePickerGroup';
import LocationInput from '../../components/EventForm/LocationInput';
import EventFormHeader from '../../components/EventForm/EventFormHeader';
import { styles } from '../../components/EventForm/EventForm.style';
import { createEventFormData } from '../../utils/createFormData';

type CreateEventScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function CreateEventScreen({ navigation }: CreateEventScreenProps) {
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    images: [],
    startTime: null,
    endTime: null,
    location: '',
    capacity: 0,
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [searchText, setSearchText] = useState('');
  const allTags = ['Âm nhạc', 'Thể thao', 'Hội thảo', 'Giáo dục'];

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      if (!form.title || !form.description || !form.startTime || !form.endTime || !form.location) {
        Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin sự kiện.');
        setLoading(false);
        return;
      }
      if (form.startTime >= form.endTime) {
        Alert.alert('Thông báo', 'Thời gian bắt đầu phải trước thời gian kết thúc.');
        setLoading(false);
        return;
      }
      if (form.capacity < 0) {
        Alert.alert('Thông báo', 'Số lượng tham gia không thể âm.');
        setLoading(false);
        return;
      }
      if (form.images.length === 0) {
        Alert.alert('Thông báo', 'Vui lòng thêm ít nhất một ảnh hoặc video cho sự kiện.');
        setLoading(false);
        return;
      }
      if (form.tags.length === 0) {
        Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một tag cho sự kiện.');
        setLoading(false);
        return;
      }
      const formData = await createEventFormData(form);
      console.log("Submitting event data:", formData);
      // Call the service to create the event
      const payloadSize = new Blob([JSON.stringify(formData)]).size;
      console.log("Payload size (bytes):", payloadSize);
      const response = await eventService.createEvent(formData);
      if (response.data) {
        console.log("Event created successfully:", response.data);
        alert('Sự kiện đã được tạo thành công!');
        // Reset form after successful creation
        setForm({
          title: '',
          description: '',
          images: [],
          startTime: null,
          endTime: null,
          location: '',
          capacity: 0,
          tags: [],
        });
        navigation.goBack();
      } else {
        alert(`Lỗi khi khởi tạo sự kiện, ${response.code}`)
      }
    } catch (error) {
      alert('Lỗi khi tạo sự kiện. Vui lòng thử lại hoặc báo cáo với team phát triển phần mềm.');
      navigation.goBack();
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  }

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4B49C8" />
        </View>
      );
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EventFormHeader 
        title="Tạo bài sự kiện"
        onBackPress={() => navigation.goBack()} 
        onSubmitPress={() => handleCreateEvent()}
        submitLabel="ĐĂNG"
      />

      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề sự kiện..."
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />

      <Text style={styles.label}>Mô tả sự kiện</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Mô tả sự kiện..."
        multiline
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      <Text style={styles.label}>Ảnh/Video</Text>
      <EventImagePicker
        images={form.images}
        setImages={(imgs) => setForm({ ...form, images: imgs })}
      />

      <DateTimePickerGroup
        startTime={form.startTime || undefined}
        endTime={form.endTime || undefined}
        setStartTime={(startTime) => setForm({ ...form, startTime })}
        setEndTime={(endTime) => setForm({ ...form, endTime })}
      />


      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Tags</Text>
          <TagSelector
            allTags={allTags}
            selectedTags={form.tags}
            setSelectedTags={(tags) => setForm({ ...form, tags })}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>Số lượng tham gia</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
            value={form.capacity.toString()}
            onChangeText={(text) =>
              setForm({ ...form, capacity: parseInt(text || '0') })
            }
          />
        </View>
      </View>

      <Text style={styles.label}>Địa điểm</Text>
      <LocationInput
        location={form.location}
        setLocation={(location) => setForm({ ...form, location })}
      />
    </ScrollView>
  );
}