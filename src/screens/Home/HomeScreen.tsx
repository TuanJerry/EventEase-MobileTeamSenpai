import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import SearchBar from "../../components/SearchBar/SearchBar";
import EventList from "../../components/EventList/EventList";
import UpcomingEvents from "../../components/EventList/UpcomingEvents";
import BoyArt from "../../../assets/boy-clipart.svg";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { eventService } from "../../services/eventService";
import { useLocation } from "../../hooks/useLocation";
import { NearbyEventListResponse } from "../../types/nearbyEvent";

const HomeScreen = () => {
	const tabBarHeight = useBottomTabBarHeight();
	const { location } = useLocation();
	const [nearbyEvents, setNearbyEvents] = useState<NearbyEventListResponse | null>(null);
	const [currentMonthEvents, setCurrentMonthEvents] = useState<NearbyEventListResponse | null>(null);
	const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const loadAllData = async () => {
			setIsLoading(true);
			try {
				// Load all data in parallel
				const [nearbyResponse, monthResponse, upcomingResponse] = await Promise.all([
					location?.subregion ? eventService.searchEventsByLocation(location.subregion) : Promise.resolve(null),
					eventService.getCurrentMonthEvents(),
					eventService.getUpcomingEvents(1)
				]);

				setNearbyEvents(nearbyResponse);
				setCurrentMonthEvents(monthResponse);
				if (upcomingResponse.status) {
					setUpcomingEvents(upcomingResponse.data.items);
					setHasMore(upcomingResponse.data.meta.currentPage < upcomingResponse.data.meta.totalPages);
				}
			} catch (error) {
				console.error('Error loading data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadAllData();
	}, [location]);

	const loadMoreUpcomingEvents = async () => {
		if (loadingMore || !hasMore) return;

		try {
			setLoadingMore(true);
			const nextPage = currentPage + 1;
			const response = await eventService.getUpcomingEvents(nextPage);
			
			if (response.status) {
				setUpcomingEvents(prev => [...prev, ...response.data.items]);
				setCurrentPage(nextPage);
				setHasMore(response.data.meta.currentPage < response.data.meta.totalPages);
			}
		} catch (error) {
			console.error('Error loading more upcoming events:', error);
		} finally {
			setLoadingMore(false);
		}
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#4B39EF" />
			</View>
		);
	}

	return (
		<View style={[styles.container, { marginBottom: tabBarHeight }]}>
			<SearchBar />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerClassName="mt-4 pb-4"
				onScroll={({ nativeEvent }) => {
					const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
					const paddingToBottom = 20;
					if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
						loadMoreUpcomingEvents();
					}
				}}
				scrollEventThrottle={400}
			>
				{nearbyEvents && (
					<EventList 
						title="Sự kiện gần bạn"
						events={nearbyEvents.data.items.map(event => {
							const date = new Date(event.startTime);
							const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
							
							return {
								id: event.id,
								title: event.title,
								backgroundImage: event.images[0]?.link || '',
								date: formattedDate,
								location: event.position,
								avatars: [],
								totalParticipants: event.participantNumber
							};
						})}
					/>
				)}
			
				<View className="relative bg-[#d6feff] rounded-3xl m-4 flex-column items-start gap-4 py-6 px-12">
					<Text className="font-semibold text-2xl">Tìm bạn bè</Text>
					<Text className="text-base">Tìm bạn để không bị bỏ lỡ</Text>
					<TouchableOpacity
						activeOpacity={0.8}
						className="justify-center items-center bg-[#00f8ff] px-7 py-3 rounded-lg"
					>
						<Text className="text-white">GỢI Ý</Text>
					</TouchableOpacity>
					<View className="absolute top-0 right-[-27]">
						<BoyArt width={120} style={{ height: "100%" }} />
					</View>
				</View>

				{currentMonthEvents && (
					<EventList 
						title="Sự kiện trong tháng"
						events={currentMonthEvents.data.items.map(event => {
							const date = new Date(event.startTime);
							const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
							
							return {
								id: event.id,
								title: event.title,
								backgroundImage: event.images[0]?.link || '',
								date: formattedDate,
								location: event.position,
								avatars: [],
								totalParticipants: event.participantNumber
							};
						})}
					/>
				)}

				<View style={styles.upcomingEventsContainer}>
					<UpcomingEvents 
						events={upcomingEvents}
						onLoadMore={loadMoreUpcomingEvents}
						loading={loadingMore}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	upcomingEventsContainer: {
		width: '100%',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HomeScreen;
