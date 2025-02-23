import React,{useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image ,Modal} from "react-native";
import { Entypo, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import DepositScreen from "../screens/DepositScreen";

const CashSection = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("Deposit"); // Default to Deposit
  
  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };
  return (
    <View style={styles.depositContainer}>
      <View style={styles.depositHeader}>
        <Text style={styles.cashLabel}>
          Cash*{"  "}
          <Text style={styles.cashAmount}>$0.00</Text>
        </Text>

        <TouchableOpacity style={styles.addButton}
       onPress={() => openModal("Deposit")}
        >
          <Entypo name="plus" size={32} color={colors.background} />
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
     onPress={() => openModal("Deposit")}
      >
         <Image
                source={icons.dollar_circle}
                style={styles.image}
              />
        <Text style={styles.depositButtonText}>Deposit</Text>
      </TouchableOpacity>
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
    <DepositScreen 
  type={modalType} 
  onClose={() => setModalVisible(false)} 
/>

    </View>
  </View>
</Modal>
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
    fontSize: 22,
    color: colors.text,
    fontWeight: "bold",
  },
  cashAmount: {
    fontSize: 17,
    fontWeight: "400",
    color: colors.subText,
  },
  addButton: {
    backgroundColor: colors.mainColor,
    alignItems:"center",
    justifyContent:"center",
    padding: 4,
    width: 38,
    height: 38,
    borderRadius: 45 / 2,
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
  image:{
    height:18,
    width:18,
    marginRight:10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: colors.background,
    height: "95%", // Adjust height for better view
  },
});

export default CashSection;
