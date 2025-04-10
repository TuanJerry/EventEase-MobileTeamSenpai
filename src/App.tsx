import { StyleSheet, Text, View } from 'react-native';
import AppBarComponent from './components/AppBarComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppBarComponent/>
    </SafeAreaProvider>
  );
}


