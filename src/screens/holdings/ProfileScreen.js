import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../../../assets/constants/colors";
import ScreenHeader from "../../components/ScreenHeader"; // Import the new header component

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("@alsulaitia291134661857");
  const [email, setEmail] = useState("alsulaitia29@gmail.com");

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Function to handle save action
  const handleSave = () => {
    console.log("Profile saved!", { username, profileImage });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Use the ScreenHeader Component */}
      <ScreenHeader title="Profile" navigation={navigation} />

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color={colors.subText} />
          )}
          <View style={styles.editIcon}>
            <Entypo name="edit" size={16} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false} // Email is read-only
        />
      </View>

      <Text style={styles.memberText}>Member since Dec 7, 2024</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.background,
    borderRadius: 22,
    padding: 6,
    borderColor: colors.subText,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  label: {
    fontFamily: "Antebas-Bold",
    color: colors.subText,
  },
  input: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 10,
    color: colors.text,
    fontSize: 16,
    marginTop: 5,
    borderColor: colors.accents,
    borderWidth: 1,
  },
  memberText: {
    fontSize: 12,
    color: colors.subText,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfileScreen;
