import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  image: string;
  date: string;
  title: string;
  location: string;
};

export default function EventCard({ image, date, title, location }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#999" />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  date: {
    color: '#5A67D8',
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginVertical: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#777',
    marginLeft: 4,
  },
});
