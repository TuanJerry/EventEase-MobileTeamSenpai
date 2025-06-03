import React, { use, useEffect, useState } from 'react';
import { ScrollView, TextInput, View, Text, Alert, Switch, ActivityIndicator } from 'react-native';
import { Event } from '../../types/event';
import { EventFormData } from '../../types/event.d';
import EventImagePicker from '../../components/EventForm/EventImagePicker';
import TagSelector from '../../components/EventForm/TagSelector';
import DateTimePickerGroup from '../../components/EventForm/DateTimePickerGroup';
import LocationInput from '../../components/EventForm/LocationInput';
import EventFormHeader from '../../components/EventForm/EventFormHeader';
import { styles } from '../../components/EventForm/EventForm.style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { eventService } from '../../services/eventService';
import { createEventFormData } from '../../utils/createFormData';
import * as Sentry from "@sentry/react-native"

type RootStackParamList = {
  EventDetail: { eventId: string };
  UpcomingEvents: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UpdateEventScreen() {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [error, setError] = useState<string | null>(null);
  const { eventId } = route.params as { eventId: string };
  const [event, setEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EventFormData>({
    title: "",
    description: "",
    images: [], // Ảnh sẽ lấy ảnh mới để cập nhật thay vì lấy ảnh cũ
    startTime: null,
    endTime: null,
    location: "",
    capacity: 0,
    tags: [],
  });
  const [originalForm, setOriginalForm] = useState<EventFormData | null>(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [confirmImageUpdate, setConfirmImageUpdate] = useState(false);
  const [searchText, setSearchText] = useState('');
  const allTags = ['Âm nhạc', 'Thể thao', 'Hội thảo', 'Giáo dục'];

  useEffect(() => {
      Sentry.captureMessage("👀 User used UpdateEventScreen");
      fetchEventDetail();
  }, [eventId]);
  
  useEffect(() => {
    if (event) {
      const loadedForm: EventFormData = {
        title: event.title || "",
        description: event.description || "",
        images: [], // Bạn có thể gán ảnh gốc nếu muốn hiển thị trước
        startTime: event.startTime ? new Date(event.startTime) : null,
        endTime: event.endTime ? new Date(event.endTime) : null,
        location: event.position || "",
        capacity: event.participantNumber || 0,
        tags: event.hashtags.map((tag) => tag.name) || [],
      };
      Sentry.withScope((scope) => {
          scope.setTag("event", "UploadEventScreen");
          scope.setContext("info-check", {
            startTime: loadedForm.startTime,
            endTime: loadedForm.endTime
          });
      });
      setForm(loadedForm);
      setOriginalForm(loadedForm);
    }
  }, [event]);

  const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await eventService.getEventDetail(eventId);
        console.log("Event detail response:", response);
        setEvent(response.data);
        setError(null);
      } catch (err) {
         Sentry.withScope((scope) => {
            scope.setTag("event", "UploadEventScreen");
            scope.setContext("images", { message: "Images are too large or Timeout when upload images" });
            Sentry.captureException(error);
         });
        setError("Không thể tải thông tin sự kiện");
        console.error("Error fetching event detail:", err);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
  };
  
  const getChangedFields = (
    original: EventFormData,
    current: EventFormData
  ): Partial<EventFormData> => {
    const changed: Partial<EventFormData> = {};

    // 1. So sánh chuỗi và số
    if (original.title !== current.title) changed.title = current.title;
    if (original.description !== current.description)
      changed.description = current.description;
    if (original.location !== current.location)
      changed.location = current.location;
    if (original.capacity !== current.capacity)
      changed.capacity = current.capacity;

    // 2. So sánh Date (dùng toISOString để so sánh giá trị)
    if (
      (original.startTime &&
        current.startTime &&
        original.startTime.toISOString() !== current.startTime.toISOString()) ||
      (!original.startTime && current.startTime) ||
      (original.startTime && !current.startTime)
    ) {
      changed.startTime = current.startTime;
    }

    if (
      (original.endTime &&
        current.endTime &&
        original.endTime.toISOString() !== current.endTime.toISOString()) ||
      (!original.endTime && current.endTime) ||
      (original.endTime && !current.endTime)
    ) {
      changed.endTime = current.endTime;
    }

    // 3. So sánh tags (array of strings, không quan tâm thứ tự)
    const tagsChanged =
      original.tags.length !== current.tags.length ||
      [...original.tags].sort().join(",") !==
        [...current.tags].sort().join(",");
    if (tagsChanged) {
      changed.tags = current.tags;
    }

    // 4. Ảnh – chỉ gửi nếu có ảnh mới
    if (current.images && current.images.length > 0) {
      changed.images = current.images;
    }

    return changed;
  };
  
  const handleUpdateEvent = async () => {
    try {
      setLoading(true);

      if (!form || !originalForm) return;

      if (form.startTime && form.endTime && form.startTime >= form.endTime) {
        Alert.alert(
          "Thông báo",
          "Thời gian bắt đầu phải trước thời gian kết thúc."
        );
        return;
      }

      if (form.capacity < 0) {
        Alert.alert("Thông báo", "Số lượng tham gia không thể âm.");
        return;
      }

      if (form.images.length === 0 && confirmImageUpdate) {
        Alert.alert(
          "Thông báo",
          "Vui lòng thêm ít nhất một ảnh hoặc video cho sự kiện."
        );
        return;
      }

      if (form.tags.length === 0) {
        Alert.alert("Thông báo", "Vui lòng chọn ít nhất một tag cho sự kiện.");
        return;
      }

      // 2. So sánh và chỉ lấy các trường thay đổi
      const changedFields = getChangedFields(originalForm, form);

      // Không có thay đổi
      if (Object.keys(changedFields).length === 0) {
        Alert.alert("Thông báo", "Không có thay đổi nào để cập nhật.");
        return;
      }

      // 3. Tạo FormData từ các trường đã thay đổi
      const formData = await createEventFormData(changedFields);
      console.log("Submitting updated event data:", formData);
      const payloadSize = new Blob([JSON.stringify(formData)]).size;
      console.log("Payload size (bytes):", payloadSize);
      const response = await eventService.updateEvent(eventId, formData);
      console.log("Event updated successfully:", response.data);

      if (response.data) {
        Alert.alert("Thành công", "Sự kiện đã được cập nhật.");
        navigation.goBack();
      } else Alert.alert("Lỗi", `Không thể cập nhật sự kiện, ${response.code}`);
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi cập nhật sự kiện. Vui lòng thử lại."
      );
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };
  
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
        title="Cập nhật sự kiện"
        onBackPress={() => navigation.goBack()}
        onSubmitPress={() => handleUpdateEvent()}
        submitLabel="Cập nhật"
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
      <View style={styles.customImagePicker}>
        <Text style={{ marginRight: 10 }}>Xác nhận đổi ảnh</Text>
        <Switch
          value={confirmImageUpdate}
          onValueChange={(value) => {
            setConfirmImageUpdate(value);
            if (!value) {
              // Nếu bỏ chọn → xóa ảnh đang chọn
              setForm({ ...form, images: [] });
            }
          }}
        />
      </View>

      {confirmImageUpdate && (
        <EventImagePicker
          images={form.images}
          setImages={(imgs) => setForm({ ...form, images: imgs })}
        />
      )}

      <DateTimePickerGroup
        key={
          (form.startTime?.toISOString() || "") + (form.endTime?.toISOString() || "") ||
          "initial"
        }
        startTime={form.startTime || undefined}
        endTime={form.endTime || undefined}
        // showStartPicker={showStartPicker}
        // showEndPicker={showEndPicker}
        // setShowStartPicker={setShowStartPicker}
        // setShowEndPicker={setShowEndPicker}
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
              setForm({ ...form, capacity: parseInt(text || "0") })
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