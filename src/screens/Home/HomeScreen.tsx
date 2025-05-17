import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import EventCard from "../../components/EventList/EventCard";

const mockEvents =
{
        id: 1,
        // backgroundImage: 'https://miro.medium.com/v2/resize:fit:1400/1*LrRIFrplsmGYko_JImnUHw.jpeg',
        backgroundImage: 'https://cdn.brvn.vn/topics/1280px/2023/329308_329308-chup-anh-su-kien-cover_1677799072.jpg',
        date: '16-03-2025 08:00 AM',
        title: 'Ngày chủ nhật đỏ, hiến máu nhân đạo',
        location: 'Bệnh viện quận 7, phường Tân Hưng',
        avatars: [
            'https://randomuser.me/api/portraits/women/44.jpg',
            'https://randomuser.me/api/portraits/men/45.jpg',
            'https://randomuser.me/api/portraits/men/46.jpg',
            'https://randomuser.me/api/portraits/men/47.jpg',
            'https://randomuser.me/api/portraits/women/48.jpg',
        ],
        totalParticipants: 686
}


const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SearchBar/>
            <EventCard {...mockEvents}/>
            <Text className="text-2xl font-bold">Home Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

export default HomeScreen;