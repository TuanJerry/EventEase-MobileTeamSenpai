import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Tag = {
  name: string;
  icon: React.FC<{ color: string }>;
};

type TagSelectorProps = {
  onChange: (selected: string[]) => void;
};

export type TagSelectorRef = {
  clear: () => void;
};

const SportsIcon = ({ color }: { color: string }) => <Icon name="basketball-ball" color={color} size={30} />;
const MusicIcon = ({ color }: { color: string }) => <Icon name="music" color={color} size={30} />;
const FoodIcon = ({ color }: { color: string }) => <Icon name="utensils" color={color} size={30} />;
const ArtIcon = ({ color }: { color: string }) => <Icon name="palette" color={color} size={30} />;
const TravelIcon = ({ color }: { color: string }) => <Icon name="plane" color={color} size={30} />;

const tags: Tag[] = [
  { name: 'Thể thao', icon: SportsIcon },
  { name: 'Âm nhạc', icon: MusicIcon },
  { name: 'Ẩm thực', icon: FoodIcon },
  { name: 'Nghệ thuật', icon: ArtIcon },
  { name: 'Du lịch', icon: TravelIcon },
];

const TagSelector = forwardRef<TagSelectorRef, TagSelectorProps>(({ onChange }, ref) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    clear: () => {
      setSelectedCategories([]);
      onChange([]);
    },
  }));

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      const exists = prev.includes(category);
      const updated = exists
        ? prev.filter(c => c !== category)
        : [...prev, category];
      onChange(updated); // Gửi lên cha
      return updated;
    });
  };

  return (
    <BottomSheetScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {tags.map((item, index) => {
        const selected = selectedCategories.includes(item.name);
        const iconColor = selected ? '#fff' : '#b6b6b6';
        const borderColor = selected ? 'transparent' : '#b6b6b6';

        return (
          <View key={index.toString()} style={styles.itemContainer}>
            <Pressable
              onPress={() => toggleCategory(item.name)}
              style={[
                styles.tagButton,
                {
                  backgroundColor: selected ? '#5669ff' : '#fff',
                  borderColor: borderColor,
                  shadowOpacity: selected ? 0.3 : 0,
                  shadowRadius: selected ? 6 : 0,
                  elevation: selected ? 5 : 0,
                },
              ]}
            >
              <item.icon color={iconColor} />
            </Pressable>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        );
      })}
    </BottomSheetScrollView>
  );
});

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 24,
  },
  tagButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  itemName: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
  },
});

export default TagSelector;
