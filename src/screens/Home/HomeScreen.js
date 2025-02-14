import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Dimensions,
  Image, SafeAreaView, TextInput, ActivityIndicator, Platform
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import colors from "../../../assets/constants/colors";
import { AntDesign } from '@expo/vector-icons';
import { Animated, PanResponder } from 'react-native';




const { width } = Dimensions.get("window");



const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleTrending, setVisibleTrending] = useState(5);
  const [loading, setLoading] = useState(false);


  const topGainers = [
    { name: "dubcat", percent: "72.24%", type: "buy", image: require("../../../assets/images/speaker.png") },
    { name: "GRPH", percent: "58.0%", type: "sell", image: require("../../../assets/images/speaker.png") },
    { name: "dubcat", percent: "72.24%", type: "buy", image: require("../../../assets/images/speaker.png") },
    { name: "GRPH", percent: "58.0%", type: "sell", image: require("../../../assets/images/speaker.png") },
  ];
  const trending = [
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../../assets/images/t1.png"), up: false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../../assets/images/t1.png"), up: false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../../assets/images/t1.png"), up: false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../../assets/images/t1.png"), up: false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../../assets/images/t1.png"), up: false },
    { name: "arc", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true },
    { name: "TRUMP", price: "$15.79", cap: "$15.8B MKT CAP", change: "1.97%", image: require("../../../assets/images/t1.png"), up: false },
    { name: "arc1", price: "$0.336", cap: "$335M MKT CAP", change: "49.29%", image: require("../../../assets/images/t1.png"), up: true },
  ];
  
  const [watchlist, setWatchlist] = useState([
    { id: 1, name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true, position: new Animated.Value(0) },
    { id: 2, name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true, position: new Animated.Value(0) },
    { id: 3, name: "jailstool", price: "$0.0392", cap: "$39.2M MKT CAP", change: "3.29%", image: require("../../../assets/images/t1.png"), up: true, position: new Animated.Value(0) },
  ]);
  
  const removeItem = (id) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === "android" ? 35 : 0
    }}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="time-outline" size={28} color={colors.text} />
        </TouchableOpacity>
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
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (
            !loading &&
            nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20
          ) {
            setLoading(true); // Start loading
            setTimeout(() => {
              setVisibleTrending((prev) => prev + 5); // Load 5 more items
              setLoading(false); // Stop loading
            }, 1500); // Simulate API delay
          }
        }}
        scrollEventThrottle={16}

      >
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Total balance</Text>
          <Text style={styles.balanceAmount}>$0.00
            <Ionicons name="chevron-forward" size={20} color={colors.subText} style={{ marginLeft: 5 }} />
          </Text>
        </View>
        <View style={styles.balanceContainerGainer}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="rocket" size={18} />
            {"  "}Top Gainers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {topGainers.map((item, index) => (
              <View key={index} style={styles.gainerCard}>
                <Image source={item.image} style={styles.gainerImage} />
                <Text style={styles.gainerName}>{item.name}</Text>
                <View style={styles.gainerChangeContainer}>
                  <AntDesign
                    name={item.type === "buy" ? "caretup" : "caretdown"}
                    size={16}
                    color={item.type === "buy" ? colors.buy : colors.sell}
                  />
                  <Text style={[styles.gainerChange, item.type === "buy" ? styles.greenText : styles.redText]}>
                    {item.percent}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        { watchlist.length>0 &&
        <View style={styles.balanceContainerGainer}>
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="eye" size={24} />
          {"  "}Watchlist</Text>
          
        {watchlist.map((item, index) => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.dx < 0) { // Only slide left
        Animated.timing(item.position, {
          toValue: gesture.dx,
          duration: 0,
          useNativeDriver: false
        }).start();
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < -100) { // Threshold to remove item
        Animated.timing(item.position, {
          toValue: -200, // Slide out completely
          duration: 300,
          useNativeDriver: false
        }).start(() => removeItem(item.id));
      } else {
        Animated.timing(item.position, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
    }
  });

  return (
    <View key={item.id} style={styles.watchlistWrapper}>
      <View style={styles.removeBackground}>
        <AntDesign name="minuscircle" size={24} color={colors.background} />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.trendingItem, { transform: [{ translateX: item.position }] },
        {
          backgroundColor: colors.background
        }
      ]}
      >
        <Image source={item.image} style={styles.trendingImage} />
        <View style={styles.trendingDetails}>
          <Text style={styles.trendingName}>{item.name}</Text>
          <Text style={styles.trendingCap}>{item.cap}</Text>
        </View>
        <View style={styles.trendingPriceContainer}>
          <Text style={styles.trendingPrice}>{item.price}</Text>
          <View style={styles.trendingChangeContainer}>
            <AntDesign
              name={item.up ? "caretup" : "caretdown"}
              size={16}
              color={item.up ? colors.buy : colors.sell}
            />
            <Text style={[styles.trendingChange, item.up ? styles.greenText : styles.redText]}>
              {item.change}
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
})}

            </View>
}
        <Text style={styles.sectionTitle}>
          <FontAwesome5 name="fire" size={24} />
          {"  "}Trending</Text>
        <View>
          {trending
            .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, visibleTrending)
            .map((item, index) => (
              <View key={index} style={styles.trendingItem}>
                <Image source={item.image} style={styles.trendingImage} />
                <View style={styles.trendingDetails}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingCap}>{item.cap}</Text>
                </View>
                <View style={styles.trendingPriceContainer}>
                  <Text style={styles.trendingPrice}>{item.price}</Text>
                  <View style={styles.trendingChangeContainer}>
                    <AntDesign
                      name={item.up ? "caretup" : "caretdown"}
                      size={16}
                      color={item.up ? colors.buy : colors.sell}
                    />
                    <Text style={[styles.trendingChange, item.up ? styles.greenText : styles.redText]}>
                      {item.change}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          {loading &&
            <ActivityIndicator
              style={{
                margin: 20,
              }}
            />}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {
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
    backgroundColor: colors.background,
    fontFamily: "Antebas-Regular",
  },
  balanceContainer: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderBottomColor: colors.accents,
    borderWidth: 1,
  },
  balanceContainerGainer: {
    paddingBottom: 25,
    borderBottomColor: colors.accents,
    borderWidth: 1,
  },
  balanceTitle: {
    fontSize: 16,
    color: colors.subText,
    fontFamily: "Antebas-Regular",
  },
  balanceAmount: {
    fontSize: 32,
    color: colors.text,
    fontWeight: "bold",

  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Antebas-Bold",
    color: colors.text,
    marginLeft: 10,
    marginVertical: 20,
  },
  horizontalScroll: {
    // paddingHorizontal: 20,
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
  gainerChange: {
    fontSize: 14,
    color: colors.buy,
    fontWeight: "bold",
    marginLeft: 5,
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
    // fontFamily: "Antebas-Regular",
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
  gainerChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  trendingChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  skeletonTrendingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.accents,
    borderRadius: 10,
    marginBottom: 10,
    opacity: 0.6,
  },

  skeletonTrendingImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.subText,
    marginRight: 15,
  },

  skeletonTrendingDetails: {
    flex: 1,
  },

  skeletonTrendingName: {
    width: 120,
    height: 16,
    backgroundColor: colors.subText,
    borderRadius: 5,
    marginBottom: 5,
  },

  skeletonTrendingCap: {
    width: 80,
    height: 12,
    backgroundColor: colors.subText,
    borderRadius: 5,
  },

  skeletonTrendingPrice: {
    width: 60,
    height: 16,
    backgroundColor: colors.subText,
    borderRadius: 5,
  },
  watchlistWrapper: {
    position: "relative",
    overflow: "hidden",
  },
  
  removeBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 70,
    backgroundColor: colors.sell,
    justifyContent: "center",
    alignItems: "center",
  },
  
};

export default HomeScreen;
