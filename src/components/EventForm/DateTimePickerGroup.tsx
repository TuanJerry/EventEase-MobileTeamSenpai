import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from './EventForm.style';
import { formatDate } from '../../utils/formatDate';

type Props = {
  startTime: Date | undefined;
  endTime: Date | undefined;
  showStartPicker: boolean;
  showEndPicker: boolean;
  setShowStartPicker: (show: boolean) => void;
  setShowEndPicker: (show: boolean) => void;
  setStartTime: (date: Date) => void;
  setEndTime: (date: Date) => void;
};

export default function DateTimePickerGroup({
  startTime, endTime, showStartPicker, showEndPicker, setShowStartPicker, setShowEndPicker, setStartTime, setEndTime
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.half}>
        <Text style={styles.label}>Thời gian bắt đầu</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowStartPicker(true)}>
          <Text style={{ color: startTime ? '#000' : '#999' }}>
            {startTime ? formatDate(startTime) : 'dd/MM/yyyy HH:mm:ss'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showStartPicker}
          mode="datetime"
          onConfirm={(date) => {
            setStartTime(date);
            setShowStartPicker(false);
          }}
          onCancel={() => setShowStartPicker(false)}
        />
      </View>

      <View style={styles.half}>
        <Text style={styles.label}>Thời gian kết thúc</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowEndPicker(true)}>
          <Text>{endTime ? formatDate(endTime) : 'dd/MM/yyyy HH:mm:ss'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showEndPicker}
          mode="datetime"
          onConfirm={(date) => {
            setEndTime(date);
            setShowEndPicker(false);
          }}
          onCancel={() => setShowEndPicker(false)}
        />
      </View>
    </View>
  );
}
