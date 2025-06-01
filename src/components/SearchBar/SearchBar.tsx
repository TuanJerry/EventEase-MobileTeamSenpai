import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/logo.svg';
import Magnifier from '../../../assets/magnifier.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TagList from './TagList';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/searchNavigation.types';
import { Tag } from '../../types/tag.types';
import { useLocation } from '../../hooks/useLocation';
import { extractCleanAddress } from '../../utils/extractCleanAddress';
import FilterModal, { FilterModalRef } from './FilterModal';

type SearchBarNavigationProp = NavigationProp<HomeStackParamList>;

const SearchBar = () => {
    const navigation = useNavigation<SearchBarNavigationProp>();
    const [searchText, setSearchText] = useState('');
    const [address, setAddress] = useState('');
    const modalRef = useRef<FilterModalRef>(null);
    const hasNotification = true;

    const onPress = () => {
        console.log('Notification button pressed');
    }

    const { location, errorMsg } = useLocation();

    if (errorMsg) return <Text>Lỗi: {errorMsg}</Text>;

    useEffect(() => {
        if (location) {
            const clean = extractCleanAddress({
                formattedAddress: location.formattedAddress || '',
                name: location.name,
                street: location.street,
                country: location.country,
            });
            setAddress(clean);
        }
    }, [location]);

    const handleSearch = () => {
        if (searchText.trim()) {
            navigation.navigate('FindEvents', { searchQuery: searchText.trim() });
        }
    };

    const handleTagPress = (hashtag: string) => {
        navigation.navigate('FindEvents', { searchQuery: hashtag });
    };

    const SportsIcon = () => <Icon name="basketball-ball"color="#fff" size={18} />;
    const MusicIcon = () => <Icon name="music"color="#fff" size={18} />;
    const FoodIcon = () => <Icon name="utensils" color="#fff" size={18} />;

    const tags: Tag[] = [
        { name: 'Thể thao', color: '#f0635a', icon: SportsIcon, hashtag: '#sports' },
        { name: 'Âm nhạc', color: '#f59762', icon: MusicIcon, hashtag: '#music' },
        { name: 'Ẩm thực', color: '#29d697', icon: FoodIcon, hashtag: '#food' },
        { name: 'Du lịch', color: '#46cdfb', icon: () => <Icon name="plane" color="#fff" size={18} />, hashtag: '#travel' },
    ];

    return (
        <View style={styles.searchBar}>
            <View style={styles.headerContainer}>
                <Logo width={32} height={32} />
                <View style={styles.locationContainer}>
                    <View style={styles.locationTitle}>
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '300' }}>
                            Vị trí hiện tại
                        </Text>
                        <Icon name="caret-down" size={16} color='#fff'/>
                    </View>
                    <Text style={styles.location}>
                        {address || 'Đang xác định vị trí...'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    {/* Nút tròn nền tím */}
                    <Icon name="bell" size={25} color="#fff" solid={false}/>
                    {/* Small dot if has notification */}
                    {hasNotification && <View style={styles.dot} />}
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.magnifierIcon} onPress={handleSearch}>
                    <Magnifier width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.verticalLine}> | </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm sự kiện..."
                    placeholderTextColor="#807bf2"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                <TouchableOpacity style={styles.filterButton} onPress={() => modalRef.current?.present()}>
                    <View style={styles.filterIconWrapper}>
                        <MaterialIcons name="filter-list" size={24} color="#655ff3" />
                    </View>
                    <Text style={{color: '#fff', fontSize: 13}}>Lọc</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.tagListContainer]}>
                <TagList tags={tags} onTagPress={handleTagPress} />
            </View>
            <FilterModal ref={modalRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#4a43ec',
        gap: 0,
        position: 'relative',
        paddingBottom: 32,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        padding: 16,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 999,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        top: 10,
        right: 13,
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: '#00F3FF',
    },
    locationContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%'
    },
    locationTitle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 5,
    },
    location: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center'
    },
    searchContainer: {
        margin: 16,
        marginTop: 0,
        flexDirection: 'row',
        height: 40,
        position: 'relative',
    },
    magnifierIcon: {
        position: 'absolute',
        left: 0,
        top: 18,
        transform: [{ translateY: -12 }],
    },
    verticalLine: {
        position: 'absolute',
        left: 28,
        top: '50%',
        transform: [{ translateY: -20 }],
        color: '#807bf2',
        fontSize: 24,
    },
    input: {
        flex: 1,
        marginLeft: 45,
        fontSize: 16,
        color: '#fff',
    },
    filterButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        borderRadius: 999,
        paddingHorizontal: 6,
    },
    filterIconWrapper: {
        backgroundColor: '#a29ef0',
        borderRadius: '50%',
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagListContainer: {
        position: 'absolute',
        top: '100%',
        paddingBottom: 16,
        zIndex: 10
    },
});

export default SearchBar;
