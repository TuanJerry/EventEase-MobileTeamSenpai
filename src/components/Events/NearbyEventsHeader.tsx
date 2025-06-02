import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Props = {
  title: string;
  onFilterPress: () => void;
  onBackPress?: () => void;
};

export default function NearbyEventsHeader({ title, onFilterPress, onBackPress }: Props) {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.headerContainer}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={onBackPress || (() => navigation.goBack())}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      {/* Tiêu đề căn giữa */}
      <View style={styles.centerTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Nút bộ lọc */}
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <SlidersHorizontal size={16} color="#fff" />
        <Text style={styles.filterText}>Bộ lọc</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  centerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1B1F',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B49C8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  filterText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 6,
  },
});
