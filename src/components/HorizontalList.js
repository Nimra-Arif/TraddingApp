import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../../assets/constants/colors";

const HorizontalList = ({ title, data, onClear,onPress }) => {
  return (
    <View>
      {/* Title with Clear Button for Recents */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onClear && data.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Scroll View */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {data.map((item, index) => (
          <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => onPress(item.name, item.icon)}>
            <Image source={item.icon} style={styles.itemIcon} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  clearButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  clearText: {
    color: colors.mainColor,
    fontSize: 16,
    fontFamily: "Antebas-Bold",
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
    marginVertical: 10,
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.card,
    borderRadius: 20,
    marginRight: 10,
    borderColor: colors.accents,
    borderWidth: 1,
  },
  itemIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
});

export default HorizontalList;
