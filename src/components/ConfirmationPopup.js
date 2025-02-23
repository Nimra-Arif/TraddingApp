import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import colors from "../../assets/constants/colors";

const ConfirmationPopup = ({ visible, onClose, onConfirm, message, confirmText, cancelText }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            {/* Cancel Button */}
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>{cancelText || "Cancel"}</Text>
            </TouchableOpacity>

            {/* Confirm Button */}
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText || "Confirm"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContainer: {
    width: "85%",
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 15,
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    
  },
  cancelButton: {
    backgroundColor: colors.subText,
  },
  confirmButton: {
    backgroundColor: colors.sellButton, // Change to a red color for sign-out
  },
  cancelText: {
    color: colors.text,
    fontSize: 15,
  },
  confirmText: {
    color: "white",
    fontSize: 15,
    // fontWeight: "bold",
  },
});

export default ConfirmationPopup;
