import React from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const Trending = ({ trending, visibleTrending, loading, searchQuery, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        <FontAwesome5 name="fire" size={24} /> {"  "}Trending
      </Text>
      <ScrollView>
        {trending
          .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, visibleTrending)
          .map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate("StocksScreen", { item })}>
              <View style={styles.trendingItem}>
                <Image source={item.image} style={styles.trendingImage} />
                <View style={styles.trendingDetails}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingCap}>{item.cap}</Text>
                </View>
                <View style={styles.trendingPriceContainer}>
                  <Text style={styles.trendingPrice}>{item.price}</Text>
                  <View style={styles.trendingChangeContainer}>
                    <AntDesign name={item.up ? "caretup" : "caretdown"} size={16} color={item.up ? colors.buy : colors.sell} />
                    <Text style={[styles.trendingChange, item.up ? styles.greenText : styles.redText]}>
                      {item.change}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
    marginVertical: 20,
  },
  trendingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  trendingImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 1,
    borderColor: colors.accents,
  },
  trendingDetails: {
    flex: 1,
  },
  trendingName: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginBottom: 5,
  },
  trendingCap: {
    fontSize: 14,
    color: colors.subText,
  },
  trendingPriceContainer: {
    alignItems: "flex-end",
  },
  trendingPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  trendingChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendingChange: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  greenText: {
    color: colors.buy,
  },
  redText: {
    color: colors.sell,
  },
  loadingIndicator: {
    margin: 20,
  },
});

export default Trending;
