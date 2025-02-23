import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import colors from "../../assets/constants/colors";

const { width, height } = Dimensions.get("window");

const WarningModal = ({ visible, onClose }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0.6}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
    >
      <View style={styles.modalContainer}>
        <Text style={styles.warningTitle}>Warning</Text>

        <Text style={styles.warningHeader}>High-Risk Coins</Text>
        <Text style={styles.warningText}>
          These coins are minted instantly and carry an extremely high risk of rug-pulls, scams, and price manipulation.
        </Text>

        <Text style={styles.warningHeader}>Proceed with Caution</Text>
        <Text style={styles.warningText}>
          There are no guarantees on the legitimacy or longevity of these coins. You may lose all your funds if the creator decides to rug-pull.
        </Text>

        <Text style={styles.dyorText}>Always do your own research (DYOR) before trading.</Text>

        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Proceed at Your Own Risk</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0, // Full width bottom sheet
    width: "100%",
    paddingHorizontal:0,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: colors.background,
    height:height*0.72,
    padding: 10,
    paddingTop:50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  warningTitle: {
    fontSize: 22,
    fontFamily: "Antebas-Bold",
    color: colors.sellButton, // Matching warning color
    marginTop: 10,
  },
  warningHeader: {
    fontSize: 17,
    // fontFamily: "Antebas-Bold",
    color: colors.text,
    fontWeight:"bold",
    marginTop: 40,
  },
  warningText: {
    fontSize: 15,
    // fontFamily: "Antebas-Regular",
    color: colors.text,
    textAlign: "center",
    fontWeight:"500",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  dyorText: {
    fontSize: 13,
    // fontFamily: "Antebas-Regular",
    fontWeight:"500",
    color: colors.subText,
    marginVertical: 80,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.mainColor,
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.text,
    fontSize: 15,
    fontFamily: "Antebas-Bold",
  },
});

export default WarningModal;
