import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/constants/colors";

const { width, height } = Dimensions.get("window");
const logo = require("../../assets/images/logo.png"); // ✅ Correct import

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, 20000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120, 
    height: 120,
    resizeMode: "contain", 
  },
});
