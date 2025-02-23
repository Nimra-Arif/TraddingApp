import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FontAwesome, Feather, FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import ScreenHeader from "../../components/ScreenHeader"; // Import the ScreenHeader component
import SupportCenterModal from "./SupportCenterModal";
import ConfirmationPopup from "../../components/ConfirmationPopup";


const SettingsScreen = ({ navigation }) => {
  const profileImage = null; // Change to image URL if available
  const [supportModalVisible, setSupportModalVisible] = useState(false);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Use ScreenHeader Component */}
      <ScreenHeader title="Settings" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={50} color={colors.subText} />
          )}
          <View style={styles.profileTextContainer}>
            <Text style={styles.username}>alsulaitia291134661857</Text>
            <Text style={styles.email}>alsulaitia29@gmail.com</Text>
          </View>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        {/* Settings List */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("NotificationsScreen")}
        >
          <Feather name="bell" size={20} color={colors.text} />
          <Text style={styles.settingText}>Notifications</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("ExportKeysScreen")}
        >
          <Feather name="lock" size={20} color={colors.text} />
          <Text style={styles.settingText}>Export keys</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="star-o" size={20} color={colors.text} />
          <Text style={styles.settingText}>Rate Pumpify</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setSupportModalVisible(true)}
        >
          <Feather name="help-circle" size={20} color={colors.text} />
          <Text style={styles.settingText}>Support center</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("LegalScreen")}
        >
          <Feather name="file-text" size={20} color={colors.text} />
          <Text style={styles.settingText}>Legal & Privacy</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => setShowSignOutPopup(true)}>
          <Feather name="log-out" size={20} color={colors.text} />
          <Text style={styles.settingText}>Sign out</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>


        {/* Social Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="instagram" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Entypo name="twitter" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="tiktok" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <Text style={styles.versionText}>v1.4.7</Text>

        {/* Support Center Modal */}
        <SupportCenterModal
          visible={supportModalVisible}
          onClose={() => setSupportModalVisible(false)}
          username="alsulaitia291134661857"
        />
        <ConfirmationPopup
          visible={showSignOutPopup}
          onClose={() => setShowSignOutPopup(false)}
          onConfirm={() => {
            setShowSignOutPopup(false);
            // Perform sign-out logic here
            console.log("User signed out");
          }}
          message="Are you sure you want to sign out?"
          confirmText="Sign Out"
          cancelText="Cancel"
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingTop: 0,
    // marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
  },
  email: {
    fontSize: 13,
    color: colors.subText,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 10,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 15,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.subText,
    alignItems: "center",
    justifyContent: "center",
  },
  versionText: {
    fontSize: 13,
    color: colors.subText,
    textAlign: "center",
    marginTop: 10,
  },
});

export default SettingsScreen;
