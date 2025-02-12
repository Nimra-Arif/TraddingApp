import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import StarterScreen from "../screens/StarterScreen";  // ✅ Fix Import

const Stack = createStackNavigator();

const CustomHeader = ({ navigation }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0A0A1A',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
  }}>
    {/* Left Side - Back Button */}
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={28} color="white" />
    </TouchableOpacity>

    {/* Right Side - Icons */}
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="star-outline" size={24} color="white" style={{ marginRight: 15 }} />
      <Ionicons name="share-outline" size={24} color="white" />
    </View>
  </View>
);

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: true, header: ({ navigation }) => <CustomHeader navigation={navigation} /> }}
      >
        <Stack.Screen name="Starter" component={StarterScreen} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
