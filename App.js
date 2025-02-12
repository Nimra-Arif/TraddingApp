import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Antebas-Regular": require("./assets/fonts/Fontspring-DEMO-antebas-regular.otf"),
        "Antebas-Bold": require("./assets/fonts/Fontspring-DEMO-antebas-bold.otf"),
        "Antebas-Light": require("./assets/fonts/Fontspring-DEMO-antebas-light.otf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);


  return <MainNavigator />;
}
