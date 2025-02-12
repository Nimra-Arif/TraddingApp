import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return <MainNavigator />;
}
