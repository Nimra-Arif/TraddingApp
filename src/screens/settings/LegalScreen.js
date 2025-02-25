import React, { useState }from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../assets/constants/colors";
import ScreenHeader from "../../components/ScreenHeader";
import ConfirmationPopup from "../../components/ConfirmationPopup";


const LegalScreen = ({ navigation }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <ScreenHeader title="Legal and Privacy" navigation={navigation} />
      {/* Legal Options */}
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons name="file-document-outline" size={20} color={colors.text} />
        <Text style={styles.itemText}>Terms of Service</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.subText} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Feather name="lock" size={20} color={colors.text} />
        <Text style={styles.itemText}>Privacy Policy</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.subText} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setShowDeletePopup(true)}>
  <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.sell} />
  <Text style={styles.deleteText}>Delete account</Text>
  <Ionicons name="chevron-forward" size={20} color={colors.subText} />
</TouchableOpacity>
<ConfirmationPopup
  visible={showDeletePopup}
  onClose={() => setShowDeletePopup(false)}
  onConfirm={() => {
    setShowDeletePopup(false);
    // Perform delete account logic here
    console.log("Account deleted");
  }}
  message="Are you sure you want to delete your account? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
/>

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
    // fontFamily: "Antebas-Bold",
    fontFamily: "Inter-Bold",
    color: colors.text,
    textAlign: "center",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.background,
    borderRadius: 10,
    // marginHorizontal: 15,
    // marginBottom: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
    fontFamily: "Inter-Regular",
  },
  deleteText: {
    flex: 1,
    fontSize: 16,
    color: colors.sell,
    marginLeft: 10,
    fontFamily: "Inter-Regular",
  },
});

export default LegalScreen;
