import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EventListProps, EventCardProps } from '../../types/event'
import EventCard from '../EventList/EventCard'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../types/searchNavigation.types'

type EventListNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'NearbyEvents' | 'CurrentMonthEvents'>;

const EventList: React.FC<EventListProps> = ({title, events = []}) => {
    const navigation = useNavigation<EventListNavigationProp>();

    if (!events || events.length === 0) {
        return null;
    }

    const handleViewMore = () => {
        if (title === "Sự kiện gần bạn") {
            navigation.navigate('NearbyEvents');
        } else if (title === "Sự kiện trong tháng") {
            navigation.navigate('CurrentMonthEvents');
        } else {
            navigation.navigate('FindEvents', {
                searchQuery: title
            });
        }
    };

    return (
        <View className='py-4'>
            <View className='px-4 py-4 flex-row items-center justify-between'>
                <Text className='text-2xl font-normal text-black'>{title}</Text>
                <Text 
                    className='text-xl' 
                    style={{color: '#747688'}} 
                    onPress={handleViewMore}
                >
                    Xem nhiều hơn <Icon name='caret-right' color='#747688'/>
                </Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='self-start gap-4 px-4'
            >
                {events.map((event: EventCardProps, index: number) => {
                    return (
                        <EventCard key={index} {...event}/>
                    );
                })}
            </ScrollView>
        </View>
    )
}

export default EventList

const styles = StyleSheet.create({})