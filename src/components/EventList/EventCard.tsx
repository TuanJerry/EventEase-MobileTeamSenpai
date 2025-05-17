import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { extractTime, TimeParts } from '../../utils/extractTime';

interface EventCardProps {
    id: number;
    title: string;
    date: string;
    backgroundImage: string;
    totalParticipants: number;
    avatars: string[];
    location: string;
}

const EventCard = ({ title, date, backgroundImage, totalParticipants, avatars, location }: EventCardProps) => {
    const maxVisible = 3;
    const displayedAvatars = avatars.slice(0, maxVisible);


    const timeParts : TimeParts = extractTime(date);

    return (
        <View className="rounded-3xl bg-white p-4 pb-7 gap-4" style={styles.container}>
            <View className='h-40 relative'>
                <View className='top-3 left-3 absolute z-10 blur-md rounded-xl items-center p-2 pb-4' style={styles.dateContainer}>
                    <Text className='text-bold font-semibold text-lg' style={{color: '#f0635a'}}>{timeParts.day}</Text>
                    <Text className='text-xs' style={{color: '#f0635a'}}>THÁNG {Number(timeParts.month)}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} className='absolute top-3 right-3 z-10 bg-white blur-md rounded-xl justify-center items-center px-4 py-3' onPress={() => console.log('Bookmark pressed')}>
                    <Icon name='bookmark' size={18} color='#f0635a'/>
                </TouchableOpacity>
                <Image source={{ uri: backgroundImage }} className="w-full h-full rounded-2xl" resizeMode='cover'/>
            </View>

            <Text className="text-2xl font-semibold text-black truncate w-11/12" numberOfLines={1}>{title}</Text>

            <View className="flex-row items-center">
                <View style={styles.avatarGroup}>
                    {displayedAvatars.map((uri, index) => (
                        <Image
                            key={index}
                            source={{ uri }}
                            style={[
                                styles.avatar,
                                { marginLeft: index === 0 ? 0 : -10, zIndex: maxVisible - index },
                            ]}
                        />
                    ))}
                </View>
                <Text style={styles.participantText}>+{totalParticipants} tham gia</Text>
            </View>

            <View className="flex-row items-center w-11/12">
                <Icon name="location-dot" size={18} color="#9594a4" />
                <Text className="truncate" style={styles.locationText} numberOfLines={1}>{location}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 290,
    },
    avatarGroup: {
        flexDirection: 'row',
        marginRight: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#ccc',
    },
    participantText: {
        fontSize: 16,
        color: '#4B39EF',
        fontWeight: '600',
    },
    locationText: {
        fontSize: 18,
        color: '#9594a4',
        marginLeft: 8,
    },
    dateContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }
});

export default EventCard;
