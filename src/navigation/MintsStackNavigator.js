import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MintsScreen from "../screens/mints/MintsScreen";
import StocksScreen from "../screens/Home/StocksPage"; // ✅ Include StocksScreen

const MintsStack = createStackNavigator();

export default function MintsStackNavigator() {
  return (
    <MintsStack.Navigator screenOptions={{ headerShown: false }}>
      <MintsStack.Screen name="MintsScreen" component={MintsScreen} />
      <MintsStack.Screen name="StocksScreen" component={StocksScreen} />
    </MintsStack.Navigator>
  );
}
