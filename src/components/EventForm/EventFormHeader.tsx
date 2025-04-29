import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './EventForm.style';

type Props = {
  title: string;
  onBackPress: () => void;
  onSubmitPress: () => void;
  submitLabel?: string; 
};

export default function EventFormHeader({ title, onBackPress, onSubmitPress, submitLabel}: Props) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.headerButton} onPress={onSubmitPress}>
        <Text style={styles.headerButtonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
