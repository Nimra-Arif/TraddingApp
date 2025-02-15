import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";

const Watchlist = ({ watchlist, removeItem, navigation }) => {
  const positionRefs = useRef({});

  return (
    <>
      {watchlist.length>0 &&
      <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        <FontAwesome5 name="eye" size={24} /> {"  "}Watchlist
      </Text>
      {watchlist.map((item) => {
        // Ensure each item has a unique animated value
        if (!positionRefs.current[item.id]) {
          positionRefs.current[item.id] = new Animated.Value(0);
        }

        const panResponder = PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (_, gesture) => {
            if (gesture.dx < 0) {
              Animated.timing(positionRefs.current[item.id], {
                toValue: gesture.dx,
                duration: 0,
                useNativeDriver: false,
              }).start();
            }
          },
          onPanResponderRelease: (_, gesture) => {
            if (gesture.dx < -100) {
              Animated.timing(positionRefs.current[item.id], {
                toValue: -200,
                duration: 300,
                useNativeDriver: false,
              }).start(() => removeItem(item.id));
            } else {
              Animated.timing(positionRefs.current[item.id], {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
              }).start();
            }
          },
        });
        return (
          <View key={item.id} style={styles.itemContainer}>
            {/* Background Delete Button */}
            <View style={styles.deleteBackground}>
              <AntDesign name="minuscircle" size={24} color={colors.background} />
            </View>

            {/* Swipeable & Clickable Watchlist Item */}
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.watchlistItem,
                { transform: [{ translateX: positionRefs.current[item.id] }] },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1} // Prevents color change on press
                onPress={() => navigation.navigate("StocksScreen", { item })}
                style={styles.fullWidthTouchable}
              >
                <Image source={item.image} style={styles.watchlistImage} />
                <View style={styles.watchlistDetails}>
                  <Text style={styles.watchlistName}>{item.name}</Text>
                  <Text style={styles.watchlistCap}>{item.cap}</Text>
                </View>
                <View style={styles.watchlistPriceContainer}>
                  <Text style={styles.watchlistPrice}>{item.price}</Text>
                  <View style={styles.watchlistChangeContainer}>
                    <AntDesign
                      name={item.up ? "caretup" : "caretdown"}
                      size={16}
                      color={item.up ? colors.buy : colors.sell}
                    />
                    <Text
                      style={[
                        styles.watchlistChange,
                        item.up ? styles.greenText : styles.redText,
                      ]}
                    >
                      {item.change}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      })}</View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.accents,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
    marginVertical: 20,
  },
  itemContainer: {
    position: "relative",
    overflow: "hidden",
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 70,
    backgroundColor: colors.sell,
    justifyContent: "center",
    alignItems: "center",
  },
  watchlistItem: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  fullWidthTouchable: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Makes it cover full width without affecting animations
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  watchlistImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 1,
    borderColor: colors.accents,
  },
  watchlistDetails: {
    flex: 1,
  },
  watchlistName: {
    fontSize: 18,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginBottom: 5,
  },
  watchlistCap: {
    fontSize: 14,
    color: colors.subText,
  },
  watchlistPriceContainer: {
    alignItems: "flex-end",
  },
  watchlistPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  watchlistChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  watchlistChange: {
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

export default Watchlist;
