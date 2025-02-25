import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, SafeAreaView, Image, Share } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import HeaderComponent from "../../components/HeaderComponent";

const { width } = Dimensions.get("window");

const RewardsScreen = ({navigation}) => {
  // Share Functionality
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Join me on this amazing platform! Sign up here: https://yourapp.com/invite",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed.");
      }
    } catch (error) {
      console.error("Error sharing: ", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Component */}
      <HeaderComponent 
      navigation={navigation}
      />

      {/* Rewards Section */}
      <View style={styles.rewardsContainer}>
        {/* Coin Icon */}
        <Image source={require("../../../assets/images/inviteicon.png")} style={styles.coinIcon} />

        {/* Title */}
        <Text style={styles.title}>Make money when your friends trade</Text>

        {/* Rewards Info */}
        <View style={styles.rewardsInfo}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>Lifetime rewards</Text>
            <Text style={styles.rewardValue}>$0.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>Friends referred</Text>
            <Text style={styles.rewardValue}>0</Text>
          </View>
        </View>

        {/* Invite Button */}
        <TouchableOpacity style={styles.inviteButton} onPress={onShare}>
          <Entypo name="forward" size={24} color={colors.text} style={styles.forwardIcon} />
          <Text style={styles.inviteText}>Invite a friend</Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          * Refer friends, and every time they trade, you win
        Memecoins—earn up to  <Text style={{ fontWeight: 'bold', color: colors.text }}>$100</Text>  for every referral!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  rewardsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 80,
    justifyContent: "center",
  },
  coinIcon: {
    width: 80, // Adjust size as needed
    height: 80,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  rewardsInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 10,
    width: width * 0.9,
    justifyContent: "space-between",
  },
  rewardItem: {
    alignItems: "center",
    flex: 1,
  },
  rewardLabel: {
    fontSize: 17,
    color: colors.subText,
    fontFamily: "Inter-Regular",
  },
  rewardValue: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.text,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.accents,
  },
  inviteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  forwardIcon: {
    position: "absolute",
    left: 30, // Moves the forward icon more to the left
  },
  inviteText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: colors.subText,
    textAlign: "center",
    marginTop: 15,
  },
});

export default RewardsScreen;
