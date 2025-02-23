import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  ScrollView,
  ActivityIndicator,Image
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import Trending from "./Trending";
import HorizontalList from "./HorizontalList";
import icons from "../../assets/constants/icons";
const { width, height } = Dimensions.get("window");

// **Recents (With Images)**
const initialRecents = [
  { name: "jailstool", icon: require("../../assets/images/solana.png") },
  { name: "TRUMP", icon: require("../../assets/images/solana.png") },
];

// **Explore Categories**
const exploreCategories = [
  { name: "Politics", icon: require("../../assets/images/t1.png") },
  { name: "Celebrities", icon: require("../../assets/images/t1.png") },
  { name: "Stocks", icon: require("../../assets/images/t1.png") },
];

// **Top Market Caps (Trending)**
const topMarketCaps = [
  { name: "cbBTC", price: "$97.2K", cap: "$1.9T MKT CAP", change: "0.407%", image: require("../../assets/images/t1.png"), up: false },
  { name: "SOL", price: "$200.46", cap: "$97.8B MKT CAP", change: "2.28%", image: require("../../assets/images/t1.png"), up: false },
  { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../assets/images/t1.png"), up: false },
  { name: "JUP", price: "$0.838", cap: "$8.4B MKT CAP", change: "1.43%", image: require("../../assets/images/t1.png"), up: false },
  { name: "Bonk", price: "$0.0000181", cap: "$1.7B MKT CAP", change: "1.79%", image: require("../../assets/images/t1.png"), up: true },
  { name: "cbBTC", price: "$97.2K", cap: "$1.9T MKT CAP", change: "0.407%", image: require("../../assets/images/t1.png"), up: false },
  { name: "SOL", price: "$200.46", cap: "$97.8B MKT CAP", change: "2.28%", image: require("../../assets/images/t1.png"), up: false },
  { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../assets/images/t1.png"), up: false },
  { name: "JUP", price: "$0.838", cap: "$8.4B MKT CAP", change: "1.43%", image: require("../../assets/images/t1.png"), up: false },
  { name: "Bonk", price: "$0.0000181", cap: "$1.7B MKT CAP", change: "1.79%", image: require("../../assets/images/t1.png"), up: true },
];

const HeaderComponent = ({ navigation }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recents, setRecents] = useState(initialRecents);
  const [loading, setLoading] = useState(false);
  const [visibleTopCaps, setVisibleTopCaps] = useState(5);



  const handleBlur = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
    setSearchQuery(""); // Clear input when back is pressed
  };

  const clearRecents = () => {
    setRecents([]); // Clear recents
  };

  const navigateToExploreDetails = (category, icon) => {
    let trendingData = [];
  
    if (category === "Stocks") {
      trendingData = [
        { name: "SPX", price: "$0.757", cap: "$757M MKT CAP", change: "10.06%", image: require("../../assets/images/t1.png"), up: true },
        { name: "GME", price: "$0.00196", cap: "$13.5M MKT CAP", change: "0.287%", image: require("../../assets/images/t1.png"), up: false },
      ];
    }
  
    navigation.navigate("ExploreDetailsScreen", { category, trendingData, categoryIcon: icon });
  };
  
  
 
  return (
    <>
      {/* Header with Search Input */}
      <View style={styles.header}>
        {!isSearchFocused && (
          <TouchableOpacity onPress={() => navigation.navigate("ActivityScreen")}>
            <Image source={icons.history_activity}
            style={{
              width:26,
              height:26,
            }}
            color={colors.text} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.searchContainer, isSearchFocused && styles.searchContainerFocused]}
          activeOpacity={1}
          onPress={() => setIsSearchFocused(true)}
        >
          {isSearchFocused ? (
            <TouchableOpacity onPress={handleBlur} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color={colors.text}  style={styles.searchIcon}/>
            </TouchableOpacity>
          ) : (
            <Ionicons name="search-outline" size={20} color={colors.subText} style={styles.searchIcon} />
          )}

          <TextInput
            placeholder={!isSearchFocused? "Search":"Search name or address"}
            placeholderTextColor={colors.subText}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
          />
        </TouchableOpacity>

        {!isSearchFocused && (
          <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
            <Ionicons name="settings-outline" size={26} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>

      {/* Full-Screen Search Overlay */}
      {isSearchFocused && (
        <View style={styles.searchOverlay}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
            onScroll={({ nativeEvent }) => {
              if (
                !loading &&
                nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20
              ) {
                setLoading(true); // Start loading
                setTimeout(() => {
                  setVisibleTopCaps((prev) => prev + 5); // Load 5 more items
                  setLoading(false); // Stop loading
                }, 1500); // Simulate API delay
              }
            }}
            scrollEventThrottle={16}
          >
            {/* Recents Section */}
            <HorizontalList title="Recents" data={recents} onClear={clearRecents} />

  <HorizontalList title="Explore" data={exploreCategories} onPress={navigateToExploreDetails} />
  
            {/* Trending Section */}
            <Trending trending={topMarketCaps.slice(0, visibleTopCaps)} navigation={navigation} title={"Top Market Caps"} loading={loading} />

          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.background,
    zIndex: 10,
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
  },
  searchContainerFocused: {
    width: width * 0.9,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.mainColor,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInput: {
    fontFamily: "Antebas-Regular",
    flex: 1,
    fontSize: 14,
    color: colors.text,
    
  },
  searchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
    backgroundColor: colors.background,
    padding: 5,
    zIndex: 9,
    paddingTop: 80,
  },
  scrollContainer: {
    marginVertical: 40,
    flex:1,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  searchIcon:{
    marginRight:10,
  }
});

export default HeaderComponent;
