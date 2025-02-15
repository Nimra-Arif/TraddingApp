import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, Entypo, FontAwesome, Feather,FontAwesome5 } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";

const SettingsScreen = ({ navigation }) => {
  const profileImage = null; // Change to image URL if available

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate("ProfileScreen")}>
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
        <TouchableOpacity style={styles.settingItem}
        onPress={() => navigation.navigate("NotificationsScreen")}
        >
          <Feather name="bell" size={20} color={colors.text} />
          <Text style={styles.settingText}>Notifications</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Feather name="lock" size={20} color={colors.text} />
          <Text style={styles.settingText}>Export keys</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="star-o" size={20} color={colors.text} />
          <Text style={styles.settingText}>Rate Moonshot</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Feather name="help-circle" size={20} color={colors.text} />
          <Text style={styles.settingText}>Support center</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Feather name="file-text" size={20} color={colors.text} />
          <Text style={styles.settingText}>Legal & Privacy</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Feather name="log-out" size={20} color={colors.text} />
          <Text style={styles.settingText}>Sign out</Text>
          <Entypo name="chevron-right" size={20} color={colors.subText} />
        </TouchableOpacity>

        {/* Social Icons */}
{/* Social Icons */}
<View style={styles.socialContainer}>
  <TouchableOpacity style={styles.socialButton}>
    <FontAwesome name="instagram" size={24} color={colors.text} />
  </TouchableOpacity>
  <TouchableOpacity style={styles.socialButton}>
    <Entypo name="twitter" size={24} color={colors.text} />
  </TouchableOpacity>
  <TouchableOpacity style={styles.socialButton}>
    <FontAwesome5 name="tiktok" size={24} color={colors.text} />
  </TouchableOpacity>
</View>

{/* Version Info */}
<Text style={styles.versionText}>v1.4.7</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: "relative", // Ensures absolute positioning works
  },
  backButton: {
    position: "absolute",
    left: 10, // Positions it properly to the left
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    textAlign: "center",
    flex: 1, // Ensures it takes center space
  },
  
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.card,
    borderRadius: 10,
    // marginHorizontal: 20,
    marginTop: 10,
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
    fontSize: 18,
    fontWeight:"bold",
    color: colors.text,
  },
  email: {
    fontSize: 14,
    color: colors.subText,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.card,
    // marginHorizontal: 20,
    // marginTop: 15,
    borderRadius: 10,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: colors.text,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 15, // Ensures spacing between icons
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.subText,
    alignItems: "center",
    justifyContent: "center",
  },
  
  versionText: {
    fontSize: 14,
    color: colors.subText,
    textAlign: "center",
    marginTop: 10,
  },
});

export default SettingsScreen;
