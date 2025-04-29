import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './EventForm.style';

type Props = {
  location: string;
  setLocation: (text: string) => void;
};

export default function LocationInput({ location, setLocation }: Props) {
  return (
    <View style={styles.inputWithIcon}>
      <TextInput
        style={styles.inputFlex}
        placeholder="Nhập địa điểm tổ chức (VD: 268 Lý Thường Kiệt, Quận 10)"
        value={location}
        onChangeText={setLocation}
      />
      <Ionicons name="location-outline" size={20} color="#666" style={{ marginRight: 8 }} />
    </View>
  );
}
