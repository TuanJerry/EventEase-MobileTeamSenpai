// src/components/EventDetails/ParticipantsBox.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  avatarUrls: string[];
  totalParticipants: number;
  joined: boolean; // <-- thêm vào props
  onJoinPress: () => void;
}

export default function ParticipantsBox({ avatarUrls, totalParticipants, joined, onJoinPress }: Props) {
  return (
    <View style={styles.absoluteContainer}>
      <View style={styles.innerBox}>
        <View style={styles.avatarContainer}>
          {avatarUrls.slice(0, 3).map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={[styles.avatar, { marginLeft: index === 0 ? 0 : -12 }]}
            />
          ))}
        </View>

        <Text style={styles.text}>+ {totalParticipants} tham gia</Text>

        <TouchableOpacity style={[styles.button, joined && styles.buttonCancel]} onPress={onJoinPress}>
          <Text style={styles.buttonText}>{joined ? 'Huỷ' : 'Tham gia'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    zIndex: 10,
    alignItems: 'center',
  },
  innerBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fff',
  },
  text: {
    marginLeft: 12,
    fontWeight: '600',
    color: '#4B49C8',
    fontSize: 16,
    flex: 1,
  },
  button: {
    backgroundColor: '#4B49C8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  buttonCancel: {
    backgroundColor: '#FF5555', // màu đỏ khi Huỷ
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
