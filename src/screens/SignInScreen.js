import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard, Dimensions, Platform } from "react-native";
import { Checkbox, ActivityIndicator } from "react-native-paper";
import colors from "../../assets/constants/colors";
import data from "../../assets/constants/data";

const { width, height } = Dimensions.get("window");

export default function SignInScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !isChecked) return;
    setLoading(true);
    
    // Simulating API call delay
    setTimeout(() => {
      setLoading(false);
      console.log("Signed in with:", email);
      Keyboard.dismiss();
      navigation.navigate("VerifyEmailScreen", { email });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.signIn.title}</Text>
      <Text style={styles.description}>{data.signIn.description}</Text>
      
      {/* Email Input with Activity Loader */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={data.signIn.placeholder}
          placeholderTextColor={colors.subText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={handleSignIn} 
        />
        {loading && <ActivityIndicator animating={true} color={colors.mainColor} style={styles.loader} />}
      </View>

      {/* Checkbox for Terms & Privacy - Fixes Outline Issue */}
      <View style={styles.checkboxContainer}>
        <Checkbox.Android
          status={isChecked ? "checked" : "unchecked"}
          onPress={() => setIsChecked(!isChecked)}
          color={colors.mainColor}
          uncheckedColor={colors.subText} // Ensures outline color when unchecked
        />
        <Text style={styles.checkboxText}>
          {data.signIn.checkboxText}{" "}
          <Text style={styles.link}>{data.signIn.termsText}</Text>{" "}
          and <Text style={styles.link}>{data.signIn.privacyText}</Text>
        </Text>
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
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.subText,
    textAlign: "center",
    marginBottom: 20,
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
    backgroundColor: colors.accents,
    paddingRight: 40, 
    backgroundColor: colors.background,
  },
  loader: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -10, // Center align
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  checkboxText: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    flexShrink: 1,
  },
  link: {
    color: colors.mainColor,
    textDecorationLine: "underline",
  },
});
