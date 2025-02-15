import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  Platform
} from "react-native";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import HeaderComponent from "../../components/HeaderComponent";
import CashSection from "../../components/CashSection";
import MoonshotsSection from "../../components/MoonshotsSection";

const { width } = Dimensions.get("window");

const HoldingsScreen = ({navigation}) => {
  const profileImage = null; // Change to image URL if available

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Component */}
      <HeaderComponent 
      
      navigation={navigation}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.profileContainer}>
  <View style={styles.avatarWrapper}>
    {profileImage ? (
      <Image source={{ uri: profileImage }} style={styles.avatar} />
    ) : (
      <Ionicons name="person-circle-outline" size={90} color={colors.subText} />
    )}
    <View style={styles.editIcon}>
      <Entypo name="edit" size={15} color={colors.text} />
    </View>
  </View>
  <Text style={styles.username}>@alsulaitia291134661857</Text>
</TouchableOpacity>


        {/* Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total in Moonshot</Text>
          <Text style={styles.balanceAmount}>$0.00</Text>
          <Text style={styles.balanceChange}>
            <Ionicons name="triangle" size={12} color={colors.subText} /> 0% All time
          </Text>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.actionButton}
            onPress={() => navigation.navigate("DepositScreen", { type: "Deposit" })}
            >
              <FontAwesome5 name="dollar-sign" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.actionText}>Deposit</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.actionButton}
            onPress={() => navigation.navigate("DepositScreen", { type: "Send" })}
            >
              <FontAwesome5 name="paper-plane" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.actionText}>Send</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.actionButton}
            onPress={() => navigation.navigate("DepositScreen", { type: "Withdraw" })}
            >
              <FontAwesome5 name="exchange-alt" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.actionText}>Withdraw</Text>
          </View>
        </View>

          {/* Cash Section */}
        <CashSection 
        navigation={navigation}
        />

{/* Moonshots Section */}
<MoonshotsSection
navigation={navigation}
/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    borderColor: colors.subText,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  username: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
  },
  balanceContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: "Antebas-Bold",
    color: colors.subText,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 5,
  },
  balanceChange: {
    fontSize: 14,
    color: colors.subText,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.accents,
  },
  actionItem: {
    alignItems: "center",
  },
  actionButton: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: colors.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
    fontFamily: "Antebas-Bold",
  },
  
});

export default HoldingsScreen;
