import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './EventForm.style';

type Props = {
  allTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  searchText: string;
  setSearchText: (text: string) => void;
};

export default function TagSelector({ allTags, selectedTags, setSelectedTags, searchText, setSearchText }: Props) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Tìm hoặc tạo tag..."
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {allTags.filter(tag => tag.toLowerCase().includes(searchText.toLowerCase()) && !selectedTags.includes(tag))
            .map((tag, index) => (
              <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => {
                setSelectedTags([...selectedTags, tag]);
                setSearchText('');
              }}>
                <Text>{tag}</Text>
              </TouchableOpacity>
          ))}
          {allTags.filter(tag => tag.toLowerCase().includes(searchText.toLowerCase())).length === 0 && (
            <TouchableOpacity style={styles.suggestionItem} onPress={() => {
              setSelectedTags([...selectedTags, searchText]);
              setSearchText('');
            }}>
              <Text>Thêm tag mới: "{searchText}"</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.selectedTagsRow}>
        {selectedTags.map((item, index) => (
          <View key={index} style={styles.selectedTag}>
            <Text style={styles.selectedTagText}>{item}</Text>
            <TouchableOpacity onPress={() => setSelectedTags(selectedTags.filter(t => t !== item))}>
              <Text style={styles.removeTagText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
