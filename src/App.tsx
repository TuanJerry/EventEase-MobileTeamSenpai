import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import UpdateEventScreen from './screens/CreateAndUpdateEvent/UpdateEventScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UpdateEventScreen />
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
