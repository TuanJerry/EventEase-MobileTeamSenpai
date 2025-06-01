import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TagListProps } from '../../types/tag.types';

const TagList: React.FC<TagListProps> = ({ tags, onTagPress }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn
                contentContainerStyle={styles.scrollContent}
            >
                {tags.map((tag, index) => {
                    const IconComponent = tag.icon;
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.tag, { backgroundColor: tag.color }]}
                            onPress={() => onTagPress(tag.hashtag)}
                        >
                            <IconComponent />
                            <Text style={styles.tagText}>{tag.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginVertical: 10
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
        elevation: 5, // Hiệu ứng bóng cho Android
        shadowColor: '#000', // Hiệu ứng bóng cho iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tagText: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 8,
        fontWeight: '600',
    },
});

export default TagList;