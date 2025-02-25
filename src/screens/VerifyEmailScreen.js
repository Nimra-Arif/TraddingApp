import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard, Dimensions, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";  // Import icon for back button
import colors from "../../assets/constants/colors";
import data from "../../assets/constants/data";

const { width, height } = Dimensions.get("window");

export default function VerifyEmailScreen({ navigation }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) return;
    setLoading(true);

    // Simulating API call delay
    setTimeout(() => {
      setLoading(false);
      console.log("Verified code:", code);
      Keyboard.dismiss();
      navigation.navigate("Tabs");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Title & Description */}
      <Text style={styles.title}>{data.verifyEmail.title}</Text>
      <Text style={styles.description}>{data.verifyEmail.description}</Text>

      {/* Code Input with Loader */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={data.verifyEmail.placeholder}
          placeholderTextColor={colors.subText}
          value={code}
          onChangeText={setCode}
          returnKeyType="done"
          autoCapitalize="none"
          onSubmitEditing={handleVerify} // Move forward on Enter/Done
        />
        {loading && <ActivityIndicator animating={true} color={colors.mainColor} style={styles.loader} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0.15 * height,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.subText,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.subText,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.text,
    backgroundColor: colors.background,
    paddingRight: 40, // Space for loader
  },
  loader: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -10, // Center align
  },
});

