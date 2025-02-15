import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import Trending from "../components/Trending";

const { height } = Dimensions.get("window");

const trending = [
  { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../assets/images/t1.png"), up: true },
  { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../assets/images/t1.png"), up: false },
  { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../assets/images/t1.png"), up: true },
  { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../assets/images/t1.png"), up: true },
  { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../assets/images/t1.png"), up: false },
];

const ExploreDetailsScreen = ({ route, navigation }) => {
  const { category, trendingData, categoryIcon } = route.params; // Get category data
  const [visibleItems, setVisibleItems] = useState(10);
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Category Title & Image */}
        <View style={styles.categoryContainer}>
  <Image source={categoryIcon} style={styles.categoryIcon} />
  <Text style={styles.title}>{category}</Text>
  <View style={styles.placeholder} />
</View>

      </View>

      {/* Trending List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (
            !loading &&
            nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20
          ) {
            setLoading(true);
            setTimeout(() => {
              setVisibleItems((prev) => prev + 5);
              setLoading(false);
            }, 1500);
          }
        }}
        scrollEventThrottle={16}
      >
        <Trending trending={trending.slice(0, visibleItems)} navigation={navigation}
        loading={loading}
        />

        {/* {loading && <ActivityIndicator size="large" color={colors.mainColor} style={styles.loader} />} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 15,
    justifyContent: "space-between",
  },
  backButton: {
    left: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1, 
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Antebas-Regular",
    color: colors.text,
    textAlign: "center",
  },
  loader: {
    marginVertical: 20,
  },
  placeholder: {
    width: 24, // Balances the layout for centering
  },
});

export default ExploreDetailsScreen;
