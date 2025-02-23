import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal,Image } from "react-native";
import { Ionicons, AntDesign, FontAwesome5, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
const PaymentMethodsSheet = ({ visible, onClose, selectedMethod, setSelectedMethod, setSelectedIcon }) => {
  // Define payment methods with corresponding icons
  const paymentMethods = [
    { 
      name: "Apple Pay", 
      icon:<Image source={icons.apple_pay}  style={{ width: 40, height: 20 }}  color={colors.text} />, 
      methodIcon: "apple",
    },
    { 
      name: "Credit/Debit Card", 
      icon: <MaterialIcons name="credit-card" size={20} color={colors.text} />, 
      methodIcon: "credit-card",
    },
    { 
      name: "Crypto", 
      icon: <Ionicons name="logo-bitcoin" size={20} color={colors.text} />, 
      methodIcon: "logo-bitcoin",
    },
    { 
      name: "Bank Transfer", 
      icon: <FontAwesome name="bank" size={20} color={colors.subText} />, 
      methodIcon: "bank",
      comingSoon: true 
    },
    { 
      name: "Coinbase", 
      icon: <FontAwesome5 name="coins" size={18} color={colors.subText} />, 
      methodIcon: "coins",
      comingSoon: true 
    },
    { 
      name: "PayPal", 
      icon: <FontAwesome5 name="paypal" size={18} color={colors.subText}/>, 
      methodIcon: "paypal",
      comingSoon: true 
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay} onTouchEnd={onClose} />
      <View style={styles.modalContent}>
        {/* Handle for dragging */}
        <View style={styles.handle} />

        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.methodItem,
              selectedMethod === method.name && { backgroundColor: colors.accents }
            ]}
            disabled={method.comingSoon}
            onPress={() => {
              setSelectedMethod(method.name);
              setSelectedIcon(method.icon); 
              onClose();
            }}
          >
            <View style={styles.methodInfo}>
              {method.icon}
              <Text style={[styles.methodText, method.comingSoon && { color: colors.subText }]}>{method.name}</Text>
            </View>
            {selectedMethod === method.name && !method.comingSoon && (
              <AntDesign name="checkcircle" size={18} color={colors.buy} />
            )}
            {method.comingSoon && <Text style={styles.comingSoonText}>Coming soon to QA</Text>}
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
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.subText,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  methodInfo: { flexDirection: "row", alignItems: "center" },
  methodText: { color: colors.text, fontSize: 16, marginLeft: 10 },
  comingSoonText: { fontSize: 12, color: colors.subText, backgroundColor:colors.accents, padding: 5, borderRadius: 6 },
});

export default PaymentMethodsSheet;
