import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, TextInput, Platform
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import colors from "../../../assets/constants/colors";
import { Animated } from 'react-native';
import TopGainers from '../../components/TopGainers';
import Trending from '../../components/Trending';
import Watchlist from '../../components/Watchlist';
import HeaderComponent from '../../components/HeaderComponent';

const { width } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
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
      <HeaderComponent
        navigation={navigation}
      />

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
        scrollEventThrottle={16}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Total balance</Text>
          <Text style={styles.balanceAmount}>$0.00
            <Ionicons name="chevron-forward" size={20} color={colors.subText} style={{ marginLeft: 5 }} />
          </Text>
        </View>
        <TopGainers topGainers={topGainers} />
        <Watchlist watchlist={watchlist} removeItem={removeItem} navigation={navigation} />
        <Trending trending={trending} visibleTrending={visibleTrending} loading={loading} navigation={navigation}
          title={"Trending"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {

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

};

export default HomeScreen;
