import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import ConfirmModal from "./ConfirmModal"; // Import the modal component
import data from "../../assets/constants/data";
import icons from "../../assets/constants/icons";
const { width, height } = Dimensions.get("window");
const Watchlist = ({  navigation }) => {
  const positionRefs = useRef({});
  const [watchlist, setWatchlist] = useState(data.watchlistData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [activeSwipe, setActiveSwipe] = useState(null); // Track which item is swiped

  const removeItem = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  return (
    <>
      {watchlist.length > 0 &&
        <View style={styles.container}>
                      <View
          style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal:10
          }}
          ><Image
          source={icons.watchlist}
          style={{
              width:20,
              height:20,
          }}
           />
            <Text style={styles.sectionTitle}>
                Watchlist
            </Text></View>
          {watchlist.map((item) => {
            // Ensure each item has a unique animated value
            if (!positionRefs.current[item.id]) {
              positionRefs.current[item.id] = new Animated.Value(0);
            }

            const panResponder = PanResponder.create({
              onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
              onPanResponderGrant: () => {
                // Reset all other items when a new one is swiped
                Object.keys(positionRefs.current).forEach((key) => {
                  if (parseInt(key) !== item.id) {
                    Animated.spring(positionRefs.current[key], {
                      toValue: 0,
                      useNativeDriver: false,
                    }).start();
                  }
                });
                setActiveSwipe(item.id);
              },
              onPanResponderMove: (_, gesture) => {
                // Prevent swiping too far left
                if (gesture.dx < 0) {
                  positionRefs.current[item.id].setValue(Math.max(gesture.dx, -width * 0.3));
                }
              },
              onPanResponderRelease: (_, gesture) => {
                if (gesture.dx < -width * 0.15) { // Trigger delete confirmation after 15% swipe
                  Animated.timing(positionRefs.current[item.id], {
                    toValue: -width * 0.3, // Fully slide left
                    duration: 200,
                    useNativeDriver: false,
                  }).start(() => {
                    setSelectedItem(item);
                    setConfirmModalVisible(true);
                  });
                } else {
                  // Smoothly reset position if not swiped enough
                  Animated.spring(positionRefs.current[item.id], {
                    toValue: 0, 
                    useNativeDriver: false,
                  }).start(() => {
                    setActiveSwipe(null); // Ensure no stuck item
                  });
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
                    activeOpacity={1}
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
          })}
        </View>
      }
      
      <ConfirmModal
        isVisible={isConfirmModalVisible}
        onClose={() => {
          setConfirmModalVisible(false);
          setActiveSwipe(null);
          if (selectedItem) {
            Animated.spring(positionRefs.current[selectedItem.id], {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          }
        }}
        onConfirm={() => {
          removeItem(selectedItem.id);
          setConfirmModalVisible(false);
          setActiveSwipe(null);
        }}
      />
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
    fontSize: 20,
    fontFamily: "Inter-Bold",
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
    // paddingVertical: 10,
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
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text,
    marginBottom: 5,
  },
  watchlistCap: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.subText,
  },
  watchlistPriceContainer: {
    alignItems: "flex-end",
  },
  watchlistPrice: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text,
    marginBottom: 5,
  },
  watchlistChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  watchlistChange: {
    fontSize: 13,
    fontFamily: "Inter-Bold",
    marginLeft: 5,
    textAlignVertical:"bottom"
  },
  greenText: {
    color: colors.buy,
  },
  redText: {
    color: colors.sell,
  },
});

export default Watchlist;
