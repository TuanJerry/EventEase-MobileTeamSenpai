import React, { useState } from 'react';
import { ScrollView, TextInput, View, Text } from 'react-native';
import { EventFormData } from '../../types/event';
import EventImagePicker from '../../components/EventForm/EventImagePicker';
import TagSelector from '../../components/EventForm/TagSelector';
import DateTimePickerGroup from '../../components/EventForm/DateTimePickerGroup';
import LocationInput from '../../components/EventForm/LocationInput';
import EventFormHeader from '../../components/EventForm/EventFormHeader';
import { styles } from '../../components/EventForm/EventForm.style';

export default function CreateEventScreen() {
  const [form, setForm] = useState<EventFormData>({
    title: '',
    description: '',
    images: [],
    startTime: null,
    endTime: null,
    location: '',
    capacity: 0,
    tags: [],
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [searchText, setSearchText] = useState('');
  const allTags = ['Âm nhạc', 'Thể thao', 'Hội thảo', 'Giáo dục'];

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EventFormHeader 
        title="Tạo bài sự kiện"
        onBackPress={() => console.log('Back pressed')} 
        onSubmitPress={() => console.log('Create:', form)}
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
        showStartPicker={showStartPicker}
        showEndPicker={showEndPicker}
        setShowStartPicker={setShowStartPicker}
        setShowEndPicker={setShowEndPicker}
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