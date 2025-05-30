// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const CalendarScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Calendar Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default CalendarScreen;

import { View, StyleSheet, Button } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import FilterModal from '../components/SearchBar/FilterModal'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import TagSelector from '../components/SearchBar/TagListModal';


const CalendarScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // Callback to handle sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  
  return (
	<View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Mở Modal từ cha" onPress={handlePresentModalPress} />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={styles.bottomSheet}
        >
          <TagSelector/>
        </BottomSheetModal>
	</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	buttonContainer: {
		padding: 16,
	},
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default CalendarScreen
