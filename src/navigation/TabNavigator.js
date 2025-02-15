import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home/HomeScreen';
import RewardsScreen from '../screens/Rewards/RewardsScreen';
import HoldingsScreen from '../screens/HoldingsScreen';
import { View, Text } from 'react-native';
import colors from "../../assets/constants/colors";
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Rewards') iconName = focused ? 'gift' : 'gift-outline';
          else if (route.name === 'Holdings') iconName = focused ? 'wallet' : 'wallet-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subText,
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingBottom: 10,
          paddingTop: 5,
          height: 70,
          borderTopWidth: 1,
          borderTopColor:colors.accents,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Antebas-Bold",
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Holdings" component={HoldingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
