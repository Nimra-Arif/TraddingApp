import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import RewardsScreen from '../screens/Rewards/RewardsScreen';
import HoldingsScreen from '../screens/holdings/HoldingsScreen';
import { BlurView } from 'expo-blur';
import { Image } from 'react-native';
import colors from "../../assets/constants/colors";
import mints from "../../assets/images/mints.png"; // Import the image
import MintsStackNavigator from './MintsStackNavigator';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Mints') {
            return (
              <Image
                source={mints}
                style={{
                  width: 32, // Adjust the size of the image
                  height: 32,
                  tintColor: focused ? colors.text : colors.subText, // Apply color tint if needed
                }}
                resizeMode="contain"
              />
            );
          } else {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Rewards') iconName = focused ? 'gift' : 'gift-outline';
            else if (route.name === 'Holdings') iconName = focused ? 'wallet' : 'wallet-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subText,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: "rgba(14, 11, 26, 0.5)", // Transparent background
          paddingBottom: 10,
          paddingTop: 5,
          height: 70,
          borderTopWidth: 0, // Remove border for a smooth blur effect
          elevation: 0, // Remove shadow for a cleaner look
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-Bold",
          marginBottom: 5,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={70} // Adjust blur intensity
            tint="dark" // Options: "dark", "light", "default"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 70,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Mints" component={MintsStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Rewards" component={RewardsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Holdings" component={HoldingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
