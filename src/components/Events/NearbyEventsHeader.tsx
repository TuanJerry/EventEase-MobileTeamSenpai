import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, SlidersHorizontal} from 'lucide-react-native';
import { StyleSheet } from 'react-native';

type Props = {
  title: string;
  onBackPress: () => void;
  onFilterPress: () => void;
};

export default function NearbyEventsHeader({ title, onBackPress, onFilterPress }: Props) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <ArrowLeft size={24} color="#1C1B1F" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

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
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1B1F',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
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
