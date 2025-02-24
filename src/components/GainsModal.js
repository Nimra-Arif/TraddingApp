import React from "react";
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,Share } from "react-native";
import { Ionicons,Entypo } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
const { width, height } = Dimensions.get("window");

const GainsModal = ({ visible, onClose, percentageGain, price }) => {

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: "Join me on this amazing platform! Sign up here: https://yourapp.com/invite",
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log("Shared with activity type: ", result.activityType);
            } else {
              console.log("Shared successfully!");
            }
          } else if (result.action === Share.dismissedAction) {
            console.log("Share dismissed.");
          }
        } catch (error) {
          console.error("Error sharing: ", error.message);
        }
      };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          <Image
            source={require("../../assets/images/gains_bg.png")} 
            style={styles.backgroundImage}
          />

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <View style={styles.closeCircle}>
              <Ionicons name="close" size={24} color="#fff" />
            </View>
          </TouchableOpacity>

          <View style={styles.contentBox}>

            <Image 
              source={require("../../assets/images/speaker.png")} 
              style={styles.profileImage} 
            />
            <Text style={styles.userName}>Pnut</Text>
            <Text style={styles.gainText}>+{19}%</Text>

            <Text style={styles.sinceText}>Since</Text>
            <Text style={styles.dateText}>Nov 5, 2024</Text>
            
          </View>

          <Text style={styles.withText}>with</Text>
          <Text style={styles.platformText}>PUMPIFY</Text>

          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Entypo name="forward" size={24} color={colors.text} style={styles.shareIcon} />
            <Text style={styles.shareText}>Share gains</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", 
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: width,
    height: height * 0.9,
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    width: "70%",
    padding: 50,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 100,
    height: 300,
    zIndex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    fontSize: 26, // Increased font size
    fontFamily: "Antebas-Bold",
    color: colors.text,
  },
  sinceText: {
    fontSize: 17,
    color: colors.text,
    marginVertical: 5,
    fontFamily: "Antebas-Bold",
  },
  dateText: {
    fontSize: 17,
    fontFamily: "Inter-Bold",
    color: colors.text,
  },
  gainText: {
    fontSize: 38,
    fontFamily: "Inter-Bold",
    color:colors.buy,
    marginTop: 10,
  },
  withText: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color:colors.subText,
    marginTop: 15,
  },
  platformText: {
    fontSize: 21,
    fontFamily: "Antebas-Bold",
    color:colors.text,
    marginTop: 5,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    position: "absolute",
    bottom: 20,
    backgroundColor: colors.mainColor,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    width:"90%",
    marginVertical:10,
  },
  shareIcon: {
        position: "absolute",
        left: 30,
  },
  shareText: {
    fontFamily: "Antebas-Bold",
    color:colors.text,
    fontSize: 18,
  },
});

export default GainsModal;
