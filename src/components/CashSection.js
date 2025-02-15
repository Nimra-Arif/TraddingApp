import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const CashSection = ({navigation}) => {
  return (
    <View style={styles.depositContainer}>
      <View style={styles.depositHeader}>
        <Text style={styles.cashLabel}>
          Cash*{"  "}
          <Text style={styles.cashAmount}>$0.00</Text>
        </Text>

        <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate("DepositScreen", { type: "Deposit" })}
        >
          <Entypo name="plus" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.depositInfo}>
        <MaterialCommunityIcons name="bank" size={30} color={colors.subText} />
        <Text style={styles.depositTitle}>Make your first deposit</Text>
        <Text style={styles.depositDescription}>
          Deposit cash easily with the payment method of your choice.
        </Text>
      </View>

      <TouchableOpacity style={styles.depositButton}
     onPress={() => navigation.navigate("DepositScreen", { type: "Deposit" })}
      >
        <FontAwesome5 name="dollar-sign" size={18} color={colors.text} style={{ marginRight: 8 }} />
        <Text style={styles.depositButtonText}>Deposit</Text>
      </TouchableOpacity>
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
  },
  depositHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cashLabel: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "bold",
  },
  cashAmount: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.subText,
  },
  addButton: {
    backgroundColor: colors.mainColor,
    borderRadius: 20,
    padding: 6,
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
});

export default CashSection;
