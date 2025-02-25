import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";

const { height } = Dimensions.get("window");

const SupportCenterModal = ({ visible, onClose, username }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Close Button (Top Right) */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.accents} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.greetingText}>Hi</Text>
            <Text style={styles.username}>{username}</Text>
            <MaterialCommunityIcons name="hand-wave" size={24} color={"#FFC107"} style={styles.wave} />
            <Text style={styles.helpText}>How can we help?</Text>
          </View>

          {/* Options List */}
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
            <View style={styles.boxContainer}>
              <TouchableOpacity style={[styles.optionBox, styles.borderBottom]}>
                <Text style={styles.optionText}>Messages</Text>
                <MaterialIcons name="message" size={20} color={colors.accents} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionBox}>
                <Text style={styles.optionText}>Help</Text>
                <Ionicons name="help-circle" size={20} color={colors.accents} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.fullOptionBox}>
              <Text style={styles.optionText}>Send us a message</Text>
              <Ionicons name="send" size={18} color={colors.accents} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.fullOptionBox}>
              <Text style={styles.optionText}>Search for help</Text>
              <Ionicons name="search" size={18} color={colors.accents} />
            </TouchableOpacity>
          </ScrollView>

          {/* Powered by Intercom */}
          <View style={styles.footerContainer}>
            <FontAwesome6 name="intercom" size={18} color={colors.subText} style={styles.intercomIcon} />
            <Text style={styles.footerText}>Powered by Intercom</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: colors.text,
    padding: 20,
    height: height * 0.8, // 80% of screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10, // Ensures it's on top
  },
  headerContainer: {
    alignItems: "flex-start",
    marginTop: 40, // Ensures it does not overlap with the close button
  },
  greetingText: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: colors.subText,
    textAlign: "center",
  },
  username: {
    fontSize: 26,
    fontFamily: "Inter-Bold",
    color: colors.subText,
    textAlign: "center",
  },
  wave: {
    fontSize: 28,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 5,
  },
  helpText: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: 10,
    color: colors.accents,
  },
  scrollContainer: {
    marginTop: 10,
  },
  boxContainer: {
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5", // Lighter shade of grey for border
    backgroundColor: colors.text, 
    shadowColor: "#D3D3D3", // Subtle grey shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adds shadow on Android
  },
  optionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",// Line only below "Messages"
  },
  fullOptionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.text,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#E5E5E5", // Lighter shade of grey for border
    shadowColor: "#D3D3D3", // Subtle grey shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adds shadow on Android
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: colors.accents,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  intercomIcon: {
    marginRight: 5,
  },
  footerText: {
    fontSize: 14,
    color: colors.subText,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
});

export default SupportCenterModal;
