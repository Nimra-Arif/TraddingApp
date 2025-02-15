import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const { width } = Dimensions.get("window");

const HeaderComponent = ({ searchQuery, setSearchQuery,navigation }) => {
  return (
    <View style={styles.header}>
      {/* History Icon */}
      <TouchableOpacity>
        <Ionicons name="time-outline" size={28} color={colors.text} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={colors.subText} style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.subText}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Settings Icon */}
      <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
        <Ionicons name="settings-outline" size={28} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.accents,
    borderRadius: 20,
    borderWidth: 1,
    padding: Platform.OS === "android" ? 0 : 10,
    width: width * 0.7,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 5,
    borderRadius: 20,
    backgroundColor: colors.background,
    fontFamily: "Antebas-Regular",
  },
});

export default HeaderComponent;
