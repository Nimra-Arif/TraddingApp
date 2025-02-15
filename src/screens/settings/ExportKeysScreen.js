import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import solana from "../../../assets/images/solana.png"; // ✅ Solana image added
import ScreenHeader from "../../components/ScreenHeader";

const ExportKeysScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      <ScreenHeader title="Export keys" navigation={navigation} />
      {/* Your Wallets Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your wallets</Text>
        <Text style={styles.sectionSubtitle}>
          Your moonshots are held in cryptocurrency wallets in your custody.
          You can directly control your wallets using your secret phrase.
        </Text>
      </View>

      {/* Solana Wallet */}
      <View style={styles.walletContainer}>
        <View style={styles.walletInfo}>
          <Image source={solana} style={styles.walletImage} />
          <Text style={styles.walletText}>Solana</Text>
        </View>
        <View style={styles.copyContainer}>
          <Text style={styles.walletAddress}>BsZB...kqwC</Text>
          <TouchableOpacity>
            <Feather name="copy" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Advanced Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced</Text>
      </View>

      {/* Secret Phrase */}
      <TouchableOpacity style={styles.secretContainer}>
        <Feather name="lock" size={22} color={colors.text} />
        <Text style={styles.secretText}>Secret phrase</Text>
        <Text style={styles.exportText}>Export</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.subText} />
      </TouchableOpacity>
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
    fontSize: 22,
    fontFamily: "Antebas-Bold",
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: colors.subText,
    marginTop: 5,
    fontFamily: "Antebas-Regular",
  },
  walletContainer: {
    backgroundColor: colors.card,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  walletInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  walletText: {
    fontSize: 20,
    color: colors.text,
    marginLeft: 10,
    fontFamily: "Antebas-Bold",
  },
  copyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletAddress: {
    fontSize: 16,
    color: colors.subText,
    marginRight: 8,
  },
  secretContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },
  secretText: {
    flex: 1,
    fontSize: 20,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
  },
  exportText: {
    fontSize: 16,
    color: colors.subText,
    marginRight: 10,
  },
});

export default ExportKeysScreen;
