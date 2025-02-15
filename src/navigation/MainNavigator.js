import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingPage1 from "../screens/OnboardingPage"; 
import SplashScreen from "../screens/SplashScreen";
import TabNavigator from "./TabNavigator";
import SignInScreen from "../screens/SignInScreen"
import VerifyEmailScreen from "../screens/VerifyEmailScreen"
import StocksScreen from "../screens/Home/StocksPage"
import DepositScreen  from "../screens/DepositScreen"
const Stack = createStackNavigator();

export default function MainNavigator() {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Onboarding" component={OnboardingPage1} /> */}
      {/* <Stack.Screen name="SignInScreen" component={SignInScreen}/> */}
      {/* <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen}/> */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="StocksScreen" component={StocksScreen}/>
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
