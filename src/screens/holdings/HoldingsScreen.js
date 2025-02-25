import React,{useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,Modal
} from "react-native";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import HeaderComponent from "../../components/HeaderComponent";
import CashSection from "../../components/CashSection";
import MoonshotsSection from "../../components/MoonshotsSection";
import icons from "../../../assets/constants/icons"
import DepositScreen from "../DepositScreen";
const { width } = Dimensions.get("window");

const HoldingsScreen = ({ navigation }) => {
  const profileImage = null; 
  const [modalVisible, setModalVisible] = useState(false);
const [modalType, setModalType] = useState("Deposit"); // Default to Deposit

const openModal = (type) => {
  setModalType(type);
  setModalVisible(true);
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Component */}
      <HeaderComponent
        navigation={navigation}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={90} color={colors.subText} />
            )}
            <View style={styles.editIcon}>
              <Entypo name="edit" size={15} color={colors.text} />
            </View>
          </View>
          <Text style={styles.username}>@alsulaitia291134661857</Text>
        </TouchableOpacity>


        {/* Balance Section */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total in Memes</Text>
          <Text style={styles.balanceAmount}>$0.00</Text>
          <View
          style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center"
          }}
          >
          <Ionicons name="triangle" size={13} color={colors.subText} />
          <Text style={styles.balanceChange}>
             {" "}0% All time
          </Text>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionItem}>
          <TouchableOpacity style={styles.actionButton} onPress={() => openModal("Deposit")}>
  <Image source={icons.dollar_filled} style={styles.image} />
</TouchableOpacity>
<Text style={styles.actionText}>Deposit</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.actionButton}
              onPress={() => openModal("Send")}
            >
              <Image
                source={icons.send_filled}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.actionText}>Send</Text>
          </View>

          <View style={styles.actionItem}>
          <TouchableOpacity style={styles.actionButton} onPress={() => openModal("Withdraw")}>
  <Image source={icons.trade_filled} style={styles.image} />
</TouchableOpacity>
<Text style={styles.actionText}>Withdraw</Text>
          </View>
        </View>

        {/* Cash Section */}
        <CashSection
          navigation={navigation}
        />

        {/* Moonshots Section */}
        <MoonshotsSection
          navigation={navigation}
        />
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

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    borderColor: colors.subText,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  username: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Inter-Regular",
    marginTop: 8,
  },
  balanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: colors.subText,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    color: colors.text,
    marginVertical: 5,
  },
  balanceChange: {
    fontSize: 14,
    color: colors.subText,
    fontFamily: "Inter-Regular",
    textAlignVertical:"bottom"
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.accents,
  },
  actionItem: {
    alignItems: "center",
  },
  actionButton: {
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:30,
  },
  actionText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
    fontFamily: "Inter-Bold",
  },
  image: {
    width: 38,
    height: 38,
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

export default HoldingsScreen;
