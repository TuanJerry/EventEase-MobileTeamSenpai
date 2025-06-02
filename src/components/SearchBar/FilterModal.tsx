import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  ScrollView,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import TagSelector, { TagSelectorRef } from "./TagListModal";
import Icon from "react-native-vector-icons/FontAwesome6";
import FeatherIcon from "react-native-vector-icons/Feather";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/formatDate";
import { getDistrictsByCityName } from "../../utils/getDistrictsByCityName";
import TextTicker from "react-native-text-ticker";

export type FilterModalRef = {
  present: () => void;
};

type FilterFormData = {
  categories: string[]; // danh mục
  time: string; // thời gian
  location: string; // vị trí
};

type FilterFormProps = {
  region: string;
  subregion: string;
};

const FilterModal = forwardRef<FilterModalRef, FilterFormProps>(
  ({ region, subregion }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [contentHeight, setContentHeight] = useState(400);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const tagSelectorRef = useRef<TagSelectorRef>(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [filterForm, setFilterForm] = useState<FilterFormData>({
      categories: [],
      time: "",
      location: "",
    });

    const [districts, setDistricts] = useState<string[]>([]);

    const [selectedDistrict, setSelectedDistrict] =
      useState<string>("Không xác định");

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetModalRef.current?.present(),
    }));

    const timeOptions = ["Hôm nay", "Ngày mai", "Tuần này"];
    const handleSelect = (option: string) => {
      setSelectedOption(option);

      if (option === "Hôm nay" || option === "Ngày mai") {
        const date = new Date();
        if (option === "Ngày mai") {
          date.setDate(date.getDate() + 1);
        }
        updateFilterForm("time", formatDate(date).split(" ")[0]);
      } else {
        updateFilterForm("time", option);
      }
      setIsDateSelected(false);
    };

    const isSelected = (option: string) => {
      if (option === "Chọn ngày") return isDateSelected;
      return selectedOption === option && !isDateSelected;
    };

    const updateFilterForm = <K extends keyof FilterFormData>(
      key: K,
      value: FilterFormData[K]
    ) => {
      setFilterForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      setShow(false);

      if (event.type === "set" && selectedDate) {
        // Người dùng chọn OK
        setDate(selectedDate);
        setIsDateSelected(true);
        const formattedDate = formatDate(selectedDate).split(" ")[0];
        updateFilterForm("time", formattedDate);

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const isSameDate = (d1: Date, d2: Date) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

        if (isSameDate(selectedDate, today)) {
          setSelectedOption("Hôm nay");
          setIsDateSelected(false);
        }

        if (isSameDate(selectedDate, tomorrow)) {
          setSelectedOption("Ngày mai");
          setIsDateSelected(false);
        }
      }
    };

    const onClear = () => {
      setIsDateSelected(false);
      setSelectedOption("");
      tagSelectorRef.current?.clear();
      setFilterForm({
        categories: [],
        time: "",
        location: "",
      });
    };

    const onSubmit = () => {
      bottomSheetModalRef.current?.close();
      console.log(filterForm);
    };

    useEffect(() => {
      if (region) {
        const fetchDistricts = async () => {
          const cityName = region || "Không xác định";
          const result = await getDistrictsByCityName(cityName);
          setDistricts(result);
        };
        fetchDistricts();

        setSelectedDistrict(`${subregion}, ${region}`);
        updateFilterForm("location", `${subregion}, ${region}`);
      }
    }, [region, subregion]);

    const handleSelectDistrict = (district: string) => {
      const location = `${district}, ${region}`;
      setSelectedDistrict(location);
      updateFilterForm("location", location);
      setModalVisible(false);
    };

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["80%"]}
        index={0}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        backgroundStyle={styles.bottomSheet}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={{ flex: 1 }}
        >
          <Text className="text-3xl font-semibold pl-4 pt-5">Bộ lọc</Text>
          <TagSelector
            onChange={(selectedCategories) => {
              updateFilterForm("categories", selectedCategories);
            }}
            ref={tagSelectorRef}
          />
          <Text className="text-2xl font-bold pl-4">Thời gian</Text>
          <View className="flex-row flex-wrap items-center gap-4 px-4 py-6">
            {timeOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => handleSelect(option)}
                className={`px-6 py-3 rounded-xl border ${
                  isSelected(option)
                    ? "bg-[#5669ff] border-transparent"
                    : "border-gray-300 bg-white"
                }`}
              >
                <Text
                  className={`text-2xl ${
                    isSelected(option) ? "text-white" : "text-gray-600"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
            {/* Tùy chọn Choose from calendar */}
            <Pressable
              onPress={() => setShow(true)}
              className={`flex-row items-center px-6 py-3 rounded-xl border ${
                isSelected("Chọn ngày")
                  ? "bg-[#5669ff] border-transparent"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Icon
                name="calendar-alt"
                size={32}
                color={isSelected("Chọn ngày") ? "#fff" : "#5669ff"}
                className="mr-2"
              />
              <Text
                className={`text-2xl mr-3 ${
                  isSelected("Chọn ngày") ? "text-white" : "text-gray-600"
                }`}
              >
                {isDateSelected ? formatDate(date).split(" ")[0] : "Chọn ngày"}
              </Text>
              <Icon
                name="chevron-right"
                size={16}
                color={isSelected("Chọn ngày") ? "#fff" : "#5669ff"}
              />
            </Pressable>
          </View>

          <Text className="text-2xl font-bold pl-4 mt-5">Vị trí</Text>
          <Pressable
            className="flex-row items-center justify-between flex-1 border-gray-300 border m-4 p-3 rounded-3xl"
            onPress={() => setModalVisible(true)}
          >
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center p-2 rounded-2xl bg-[#e6e8ff]">
                <View className="rounded-2xl p-3 bg-white">
                  <FeatherIcon name="map-pin" size={20} color="#5669ff" />
                </View>
              </View>
              <View className="flex-row w-[260]">
                <Text className="text-2xl flex-shrink">{selectedDistrict}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={16} color="#5669ff" />
          </Pressable>
          <View className="flex-1 flex-row mx-4 justify-between gap-4 mt-4 mb-8">
            <TouchableOpacity
              onPress={onClear}
              activeOpacity={0.6}
              className="border flex-1 border-gray-300 py-4 px-6 rounded-2xl"
            >
              <Text className="font-semibold text-xl text-center">ĐẶT LẠI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              activeOpacity={0.6}
              className="border flex-1 border-gray-300 py-4 px-6 rounded-2xl bg-[#5669ff]"
            >
              <Text className="font-semibold text-xl text-white text-center">
                ÁP DỤNG
              </Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View className="flex-1 justify-center bg-black/50">
                <View className="bg-white mx-5 p-5 rounded-lg max-h-[80%]">
                  <Text className="text-lg font-bold mb-3">Chọn Quận</Text>
                  <FlatList
                    data={districts}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Pressable
                        className="p-4 border-b border-gray-200"
                        onPress={() => handleSelectDistrict(item)}
                      >
                        <Text className="text-base">{item}</Text>
                      </Pressable>
                    )}
                  />
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    className="bg-[#5669ff] rounded-lg py-4"
                  >
                    <Text className="text-white text-center font-semibold">
                      ĐÓNG
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          {show && (
            <DateTimePicker
              value={date}
              minimumDate={new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default FilterModal;
