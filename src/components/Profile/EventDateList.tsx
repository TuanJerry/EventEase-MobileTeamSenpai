// components/EventGroupList.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoriteEvent } from '../../types/event';

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

interface EventDateListProps {
  data: EventGroup[];
  onEventPress?: (event: FavoriteEvent) => void;
}

export default function EventDateList({ data, onEventPress }: EventDateListProps) {
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
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
              onPress={() => onEventPress?.({
                id: event.id,
                eventId: event.id,
                title: event.title,
                startTime: '',
                endTime: '',
                position: event.location,
                participantNumber: 0,
                imagesMain: event.image,
                createdAt: '',
                createdBy: ''
              })}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>
                  <Text style={{ color: '#F27830' }}>● </Text>
                  {event.location}
                </Text>
              </View>
            </TouchableOpacity>
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
