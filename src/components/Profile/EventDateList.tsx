// components/EventGroupList.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

interface Event {
  id: string;
  title: string;
  location: string;
  image: string;
}

interface EventGroup {
  date: string;
  shortDate: string;
  events: Event[];
}

export default function EventDateList({ data }: { data: EventGroup[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 32 }}>
          <View style={styles.dateRow}>
            <View style={styles.shortDateBox}>
              <Text style={styles.shortDateText}>{item.shortDate}</Text>
            </View>
            <Text style={styles.fullDateText}>{item.date}</Text>
          </View>
          {item.events.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>
                  <Text style={{ color: '#F27830' }}>● </Text>
                  {event.location}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shortDateBox: {
    backgroundColor: '#FCEBE2',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  shortDateText: {
    fontSize: 13,
    color: '#E26B1F',
    textAlign: 'center',
    lineHeight: 18,
  },
  fullDateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    marginLeft: 20,
    gap: 10,
  },
  eventImage: {
    width: 79,
    height: 79,
    borderRadius: 12,
  },
  eventTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
  },
});
