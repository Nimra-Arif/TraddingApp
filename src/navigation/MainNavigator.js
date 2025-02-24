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
import ProfileScreen from "../screens/holdings/ProfileScreen"
import SettingsScreen from "../screens/settings/SettingsScreen"
import NotificationsScreen from "../screens/settings/NotificationsScreen"
import ExportKeysScreen from "../screens/settings/ExportKeysScreen"
import LegalScreen from "../screens/settings/LegalScreen"
import ActivityScreen from "../screens/ActivityScreen"
import ExploreDetailsScreen from "../screens/ExploreDetailsScreen"
import * as Font from "expo-font";
const Stack = createStackNavigator();

export default function MainNavigator() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Antebas-Regular": require("../../assets/fonts/Fontspring-DEMO-antebas-regular.otf"),
          "Antebas-Bold": require("../../assets/fonts/Fontspring-DEMO-antebas-bold.otf"),
          "Antebas-Light": require("../../assets/fonts/Fontspring-DEMO-antebas-light.otf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }

    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingPage1} />
      <Stack.Screen name="SignInScreen" component={SignInScreen}/>
      <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen}/>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="StocksScreen" component={StocksScreen}/>
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen}/>
      <Stack.Screen name="ExportKeysScreen" component={ExportKeysScreen} />
      <Stack.Screen name="LegalScreen" component={LegalScreen}/>
      <Stack.Screen name="ActivityScreen" component={ActivityScreen}/>
      <Stack.Screen name="ExploreDetailsScreen" component={ExploreDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
