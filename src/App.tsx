import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import EventDetailScreen from './screens/EventDetails/EventDetailScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EventDetailScreen />
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
