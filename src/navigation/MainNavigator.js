import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingPage1 from "../screens/OnboardingPage"; 
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={OnboardingPage1} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
