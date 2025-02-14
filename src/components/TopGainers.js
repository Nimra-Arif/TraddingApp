import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const TopGainers = ({ topGainers }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        <Ionicons name="rocket" size={20} /> {" "}Top Gainers
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topGainers.map((item, index) => (
          <View key={index} style={styles.gainerCard}>
            <Image source={item.image} style={styles.gainerImage} />
            <Text style={styles.gainerName}>{item.name}</Text>
            <View style={styles.gainerChangeContainer}>
              <AntDesign name={item.type === "buy" ? "caretup" : "caretdown"} size={16} color={item.type === "buy" ? colors.buy : colors.sell} />
              <Text style={[styles.gainerChange, item.type === "buy" ? styles.greenText : styles.redText]}>
                {item.percent}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    borderBottomColor: colors.accents,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
    marginVertical: 20,
  },
  gainerCard: {
    borderColor: colors.accents,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginRight: 10,
    flexDirection: "row",
  },
  gainerImage: {
    width: 26,
    height: 26,
    borderRadius: 15,
    marginRight: 10,
  },
  gainerName: {
    fontSize: 16,
    color: colors.text,
    marginRight: 15,
    fontFamily: "Antebas-Bold",
  },
  gainerChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gainerChange: {
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
});

export default TopGainers;
