import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, TextInput, Platform,RefreshControl,ActivityIndicator
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import colors from "../../../assets/constants/colors";
import { Animated } from 'react-native';
import TopGainers from '../../components/TopGainers';
import Trending from '../../components/Trending';
import Watchlist from '../../components/Watchlist';
import HeaderComponent from '../../components/HeaderComponent';
import Spotlight from "../../components/Spotlight"

const { width } = Dimensions.get("window");
const HomeScreen = ({ navigation }) => {
  const [visibleTrending, setVisibleTrending] = useState(5);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setVisibleTrending(5); // Reset trending items count
    }, 1500);
  };
  
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === "android" ? 35 : 0,
    }}>
      <HeaderComponent
        navigation={navigation}
      />

<ScrollView
  style={{ flex: 1, backgroundColor: colors.background }}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[colors.text]}
      tintColor={colors.text}
    />
  }
  onScroll={({ nativeEvent }) => {
    if (
      !loading &&
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20
    ) {
      setLoading(true);
      setTimeout(() => {
        setVisibleTrending((prev) => prev + 5);
        setLoading(false);
      }, 1500);
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
        <Spotlight/>
        <TopGainers />
        <Watchlist navigation={navigation} />
        <Trending visibleTrending={visibleTrending} loading={loading} navigation={navigation}
          title={"Trending"}
        />
        {/* {loading && (
  <ActivityIndicator size="small" color={colors.text} style={{ marginVertical: 20 }} />
)} */}

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {

  balanceContainer: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderBottomColor: colors.accents,
    borderBottomWidth: 1,
  },
  balanceContainerGainer: {
    paddingBottom: 25,
    borderBottomColor: colors.accents,
    borderBottomWidth: 1,
  },
  balanceTitle: {
    fontSize: 15,
    color: colors.subText,
    fontFamily: "Inter-Bold",
  },
  balanceAmount: {
    fontSize: 30,
    color: colors.text,
    fontFamily: "Inter-Bold",
    marginTop:2,


  },

};

export default HomeScreen;
