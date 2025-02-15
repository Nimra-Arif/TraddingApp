import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from "react-native";
import { Ionicons, FontAwesome5 ,MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import ScreenHeader from "../../components/ScreenHeader"; 

const NotificationsScreen = ({ navigation }) => {
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [referralRewards, setReferralRewards] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScreenHeader title="Notifications" navigation={navigation} />

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Push notifications</Text>
        <Text style={styles.sectionSubtitle}>
          We'll help you stay on top of the markets and know about things before others do.
        </Text>
      </View>

      {/* Notification Toggles */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleItem}>
          <MaterialCommunityIcons name="triangle-wave" size={20} color={colors.text} style={styles.icon} />
          <Text style={styles.toggleText}>Price alerts</Text>
          <Switch
            value={priceAlerts}
            onValueChange={setPriceAlerts}
            trackColor={{ false: colors.card, true: colors.mainColor }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <FontAwesome5 name="gift" size={20} color={colors.text} style={styles.icon} />
          <Text style={styles.toggleText}>Referral rewards</Text>
          <Switch
            value={referralRewards}
            onValueChange={setReferralRewards}
            trackColor={{ false: colors.card, true: colors.mainColor }}
            thumbColor={colors.text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    textAlign: "center",
    flex: 1,
  },
  section: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.subText,
    marginTop: 5,
  },
  toggleContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  toggleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 10,
    margintop: 0,
  },
  icon: {
    marginRight: 10,
  },
  toggleText: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
  },
});

export default NotificationsScreen;
