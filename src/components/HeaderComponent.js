import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const { width } = Dimensions.get("window");

const HeaderComponent = ({  navigation }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery,setSearchQuery]=useState("")
  const handleBlur = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
    setSearchQuery(""); // Clear search input when back is pressed
  };

  return (
    <View style={styles.header}>
      {/* Show Back-in-time Icon When Not Focused */}
      {!isSearchFocused && (
        <TouchableOpacity onPress={() => navigation.navigate("ActivityScreen")}>
          <Entypo name="back-in-time" size={28} color={colors.text} />
        </TouchableOpacity>
      )}

      {/* Search Bar */}
      <View style={[styles.searchContainer, isSearchFocused && styles.searchContainerFocused]}>
        {/* Show Back Arrow Inside Input When Focused */}
        {isSearchFocused ? (
          <TouchableOpacity onPress={handleBlur} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <Ionicons name="search-outline" size={20} color={colors.subText} style={styles.searchIcon} />
        )}

        <TextInput
          placeholder="Search name or address"
          placeholderTextColor={colors.subText}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={handleBlur} // Properly resets state when input loses focus
        />
      </View>

      {/* Show Settings Icon Only When Search is Not Focused */}
      {!isSearchFocused && (
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Ionicons name="settings-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.accents,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: width * 0.65, 
    height: 50,
    backgroundColor: colors.background,
    transition: "all 0.3s ease", 
  },
  searchContainerFocused: {
    width: width * 0.9, 
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.mainColor, // **Main color outline when focused**
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Light transparency effect
  },
  backButton: {
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 10, // Keeps search icon aligned
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: "Antebas-Regular",
  },
});

export default HeaderComponent;
