import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import data from "../../assets/constants/data";
import icons from "../../assets/constants/icons";
const TopGainers = () => {
  return (
    <View style={styles.container}>
       <View
          style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal:10
          }}
          >
      <Image
                source={icons.top_gainers}
                style={{
                    width:20,
                    height:20,
                    
                }}
                 />
      <Text style={styles.sectionTitle}>
       Top Gainers
      </Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.topGainers.map((item, index) => (
          <View key={index} style={styles.gainerCard}>
            <Image source={item.image} style={styles.gainerImage} />
            <Text style={styles.gainerName}>{item.name}</Text>
            <View style={styles.gainerChangeContainer}>
              <AntDesign name={item.type === "buy" ? "caretup" : "caretdown"} size={17} color={item.type === "buy" ? colors.buy : colors.sell} />
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
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.text,
    marginLeft: 10,
    marginVertical: 20,
    textAlign:"center",

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
    fontFamily: "Inter-Bold",
  },
  gainerChangeContainer: {

      display:"flex",
      flexDirection:"row",
      alignItems:"center"
  },
  gainerChange: {
    fontSize: 13,
    fontFamily: "Inter-Bold",
    marginLeft: 5,
    textAlignVertical:"bottom",
  },
  greenText: {
    color: colors.buy,
  },
  redText: {
    color: colors.sell,
  },
});

export default TopGainers;
