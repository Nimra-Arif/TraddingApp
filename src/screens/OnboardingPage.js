import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions,Alert,Share } from "react-native";
import Swiper from "react-native-swiper";
import colors from "../../assets/constants/colors";
import data from "../../assets/constants/data";
import { FontWeight } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");
export default function OnboardingScreen({ navigation }) {

  

const enableNotifications = () => {
  Alert.alert(
    "Enable Notifications?",
    "Pumpify would like to send you notifications. These may include alerts, sounds, and icon badges.",
    [
      {
        text: "Don't Allow",
        style: "cancel",
        onPress: () => console.log("User denied notifications"),
      },
      {
        text: "Allow",
        onPress: () => {
          console.log("Notifications Enabled!");
        },
      },
    ]
  );
};


const inviteFriend = async () => {
  try {
    const result = await Share.share({
      message: "Join Pumpify and start earning! Use my invite link: https://pumpify.com/invite",
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(`Shared via ${result.activityType}`);
      } else {
        console.log("Shared successfully");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Share dismissed");
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};


  const navigateToSignIn = () => {
    navigation.navigate("SignInScreen");
  };
  const actions = {
    enableNotifications,
    inviteFriend,
    navigateToSignIn,
  };

  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      paginationStyle={{ bottom: 140 }}  >
      {data.onboarding.map((item, index) => (
        <View key={index} style={styles.container}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={actions[item.buttonAction]} 
              style={styles.button}
            >
              <Text style={styles.buttonText}>{item.buttonText}</Text>
            </TouchableOpacity>
            {item.footerText !== "" && (
              <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
                <Text style={styles.footerText}>{item.footerText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop:0.25* height,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Antebas-Regular",
    color: colors.subText,
    textAlign: "center",
    marginTop: 10,
    width: "90%",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: colors.paginationInactive,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.paginationActive,
  },
  button: {
    backgroundColor: colors.mainColor,
    paddingVertical: 16,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: 17,
    fontFamily: "Antebas-Regular",
    FontWeight:"600",
  },
  footerText: {
    color: colors.subText,
    fontSize: 14,
    // fontFamily: "Antebas-Regular",
  },
};
