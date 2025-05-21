import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EventListProps } from '../../types/event'
import EventCard from '../EventList/EventCard'
import Icon from 'react-native-vector-icons/FontAwesome6'

const EventList: React.FC<EventListProps> = ({title, events}) => {
    return (
        <View className='py-4'>
            <View className='px-4 py-4 flex-row items-center justify-between'>
                <Text className='text-2xl font-normal text-black'>{title}</Text>
                <Text className='text-xl' style={{color: '#747688'}} onPress={() => {console.log("More")}}>Xem nhiều hơn <Icon name='caret-right' color='#747688'/></Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName='self-start gap-4 px-4'
            >
                {events.map((event, index) => {
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