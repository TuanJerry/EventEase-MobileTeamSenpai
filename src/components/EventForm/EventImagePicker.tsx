import React from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './EventForm.style';

interface Props {
  maxImages?: number; // Số lượng ảnh tối đa (default 4)
  images: string[];
  setImages: (images: string[]) => void;
}

export default function EventImagePicker({ maxImages = 4, images, setImages }: Props) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Bạn cần cấp quyền truy cập thư viện ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImages([...images, uri].slice(0, maxImages)); // Không dùng prev
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <View style={styles.imageRow}>
      {[...Array(maxImages)].map((_, index) => {
        const uri = images[index];
        return uri ? (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.imagePlaceholder} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity key={index} style={styles.imagePlaceholder} onPress={pickImage}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
