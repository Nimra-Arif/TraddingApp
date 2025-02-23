import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const MoonshotsSection = ({navigation}) => {
  return (
    <View style={styles.depositContainer}>
      <View style={styles.depositHeader}>
        <Text style={styles.cashLabel}>
        Memes{"  "}
          <Text style={styles.cashAmount}>$0.00</Text>
        </Text>
      </View>

      <View style={styles.depositInfo}>
        <Ionicons name="wallet-outline" size={30} color={colors.subText} />
        <Text style={styles.depositTitle}>No memes yet</Text>
        <Text style={styles.depositDescription}>
        Memes you buy will show up here.
        </Text>
      </View>

      <TouchableOpacity style={styles.depositButton}
      onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="search-outline" size={18} color={colors.text} style={{ marginRight: 8 }} />
        <Text style={styles.depositButtonText}>Explore memes</Text>
      </TouchableOpacity>

      {/* Footer Note */}
      <Text style={styles.footerText}>
        * Cash balances are held in USDC, a fully collateralized stablecoin.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  depositContainer: {
    backgroundColor: colors.darkCard,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.accents,
    marginBottom:30,
  },
  depositHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cashLabel: {
    fontSize: 22,
    color: colors.text,
    fontWeight: "bold",
  },
  cashAmount: {
    fontSize: 17,
    fontWeight: "400",
    color: colors.subText,
  },
  depositInfo: {
    alignItems: "center",
    marginTop: 25,
  },
  depositTitle: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginVertical: 10,
  },
  depositDescription: {
    fontSize: 14,
    color: colors.subText,
    fontFamily: "Antebas-Regular",
    textAlign: "center",
  },
  depositButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 15,
    alignSelf: "center",
  },
  depositButtonText: {
    color: colors.text,
    fontSize: 14,
  },
  footerText: {
    fontSize: 11,
    color: colors.subText,
    textAlign: "center",
    marginVertical: 15,
  },
});

export default MoonshotsSection;
