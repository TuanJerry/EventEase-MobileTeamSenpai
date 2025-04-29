import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import FindEventsScreen from './screens/ListEvent/FindEventsScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FindEventsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
