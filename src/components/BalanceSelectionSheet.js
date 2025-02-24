import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
const BalanceSelectionSheet = ({ visible, onClose, selectedBalance, setSelectedBalance, setBalanceIcon }) => {
  const balances = [
    { 
      name: "Cash", 
      amount: "$0.00", 
      icon: <Image source={icons.dollar_circle} style={{ width: 24, height: 24 }} />,
      iconType: "cash"
    },
    { 
      name: "Solana", 
      amount: "$0.00", 
      icon: <Image source={icons.Solana} style={{ width: 24, height: 24 }} />,
      iconType: "solana",
      subText: "0 SOL"
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay} onTouchEnd={onClose} />
      <View style={styles.modalContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Select balance</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <View style={styles.iconBackground}>
              <Ionicons name="close" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {balances.map((balance, index) => (
          <TouchableOpacity
            key={index}
            style={styles.balanceItem}
            onPress={() => {
              setSelectedBalance(balance.name);
              setBalanceIcon(balance.icon);
              onClose();
            }}
          >
            <View style={styles.balanceInfo}>
              {balance.icon}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.balanceText}>{balance.name}</Text>
                {balance.subText && <Text style={styles.subText}>{balance.subText}</Text>}
              </View>
            </View>
            <Text style={styles.balanceAmount}>{balance.amount}</Text>
          </TouchableOpacity>
        ))}

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "70%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  title: { 
    color: "white", 
    fontSize: 20, 
    fontFamily: "Antebas-Bold",
  },
  closeButton: {
    position: "absolute",
    right: 10, 
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accents,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  balanceInfo: { flexDirection: "row", alignItems: "center" },
  balanceText: { color: "white", fontSize: 20, fontFamily: "Antebas-Bold" },
  subText: { color: colors.subText, fontSize: 16 },
  balanceAmount: { color: "white", fontSize: 20, fontWeight: "bold" },
});

export default BalanceSelectionSheet;
