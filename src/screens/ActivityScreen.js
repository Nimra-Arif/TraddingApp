import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather,Entypo } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import ScreenHeader from "../components/ScreenHeader";

const ActivityScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Back Button */}

      <ScreenHeader title="Activity" navigation={navigation} />
      {/* Empty State Content */}
      <View style={styles.emptyStateContainer}>
        <Entypo name="back-in-time" size={40} color={colors.subText} />
        <Text style={styles.emptyTitle}>No transactions yet</Text>
        <Text style={styles.emptySubtitle}>
          Your buys and sells will show up here.
        </Text>

        {/* Explore Button */}
        <TouchableOpacity style={styles.exploreButton}
        onPress={() => navigation.goBack()}
        >
          <Feather name="search" size={20} color={colors.text} />
          <Text style={styles.exploreButtonText}>Explore moonshots</Text>
        </TouchableOpacity>
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
  emptyStateContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.subText,
    fontFamily: "Antebas-Regular",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  exploreButtonText: {
    fontSize: 16,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
  },
});

export default ActivityScreen;
