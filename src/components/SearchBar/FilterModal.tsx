import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import TagSelector from './TagListModal';
import Icon from 'react-native-vector-icons/FontAwesome6';
import FeatherIcon from 'react-native-vector-icons/Feather';

export type FilterModalRef = {
  present: () => void;
};

const FilterModal = forwardRef<FilterModalRef>((_, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
  }));

  // Callback to handle sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [selectedOption, setSelectedOption] = useState('Tomorrow'); // Mặc định chọn "Tomorrow"

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      snapPoints={['75%']}
      index={0}
      backgroundStyle={styles.bottomSheet}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.modalContent}
      >
        <Text className="text-3xl font-semibold pt-5 pl-4">Bộ lọc</Text>
        <TagSelector/>
        <Text className="text-2xl font-bold pl-4">Thời gian</Text>
        <View className="flex-row flex-wrap items-center gap-4 px-4 py-6">
          {/* Nút Today */} 
          <Pressable
            onPress={() => handleSelect('Hôm nay')}
            className={`px-6 py-3 rounded-xl border ${
              selectedOption === 'Hôm nay' ? 'bg-[#5669ff] border-transparent' : 'border-gray-300 bg-white'
            }`}
          >
            <Text
              className={`text-2xl ${
                selectedOption === 'Hôm nay' ? 'text-white' : 'text-gray-600'
              }`}
            >
              Hôm nay
            </Text>
          </Pressable>

          {/* Nút Tomorrow */}
          <Pressable
            onPress={() => handleSelect('Ngày mai')}
            className={`px-6 py-3 rounded-xl border ${
              selectedOption === 'Ngày mai' ? 'bg-[#5669ff] border-transparent' : 'border-gray-300 bg-white'
            }`}
          >
            <Text
              className={`text-2xl ${
                selectedOption === 'Ngày mai' ? 'text-white' : 'text-gray-600'
              }`}
            >
              Ngày mai
            </Text>
          </Pressable>

          {/* Nút This week */}
          <Pressable
            onPress={() => handleSelect('Tuần này')}
            className={`px-6 py-3 rounded-xl border ${
              selectedOption === 'Tuần này' ? 'bg-[#5669ff] border-transparent' : 'border-gray-300 bg-white'
            }`}
          >
            <Text
              className={`text-2xl ${
                selectedOption === 'Tuần này' ? 'text-white' : 'text-gray-600'
              }`}
            >
              Tuần này
            </Text>
          </Pressable>

          {/* Tùy chọn Choose from calendar */}
          <Pressable
            onPress={() => handleSelect('Calendar')}
            className="flex-row items-center px-6 py-3 rounded-xl border border-gray-300 bg-white"
          >
            <Icon name="calendar-alt" size={32} color="#5669ff" className="mr-2" />
            <Text className="text-2xl text-gray-600 mr-3">
              Chọn ngày
            </Text>
            <Icon name="chevron-right" size={16} color="#5669ff" />
          </Pressable>
        </View>
        <Text className="text-2xl font-bold pl-4">
          Vị trí
        </Text>
        <Pressable
          className="flex-row items-center justify-between w-full border-gray-300 border mx-4 p-3 rounded-3xl"
        >
          <View className="flex-row items-center">
            <View className="items-center justify-center p-2 rounded-2xl bg-[#e6e8ff] mr-5">
              <View className="rounded-2xl p-3 bg-white">
                <FeatherIcon name="map-pin" size={20} color="#5669ff"/>
              </View>
            </View>
            <Text className="text-2xl">Quận 6, Hồ Chí Minh</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#5669ff" />
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

});

export default FilterModal;