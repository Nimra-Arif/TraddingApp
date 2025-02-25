import React, { useState,useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, TextInput, Platform,RefreshControl,ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import colors from "../../../assets/constants/colors";
import { Animated } from 'react-native';
import TopGainers from '../../components/TopGainers';
import Trending from '../../components/Trending';
import Watchlist from '../../components/Watchlist';
import HeaderComponent from '../../components/HeaderComponent';
import WarningModal from "../../components/WarningModal"; 
import { useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import Spotlight from "../../components/Spotlight"

const { width } = Dimensions.get("window");
const MintsScreen = ({ navigation }) => {
  const [visibleTrending, setVisibleTrending] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isWarningVisible, setWarningVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setWarningVisible(true); 
    }
  }, [isFocused]);
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
      width:"100%",
      paddingHorizontal:0,
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
  <View style={styles.balanceRow}>
    <View>
      <Text style={styles.balanceTitle}>Total balance</Text>
      <Text style={styles.balanceAmount}>
        $0.00
        <Ionicons name="chevron-forward" size={20} color={colors.subText} style={{ marginLeft: 5 }} />
      </Text>
    </View>

    <TouchableOpacity style={styles.addCoinButton}>
      <Text style={styles.addCoinText}>Create a Coin</Text>
    </TouchableOpacity>
  </View>
</View>
<Spotlight/>
        <TopGainers/>
        <Watchlist navigation={navigation} />
        <Trending visibleTrending={visibleTrending} loading={loading} navigation={navigation}
          title={"Trending"}
        />
          <ActivityIndicator size="small" color={colors.text} style={{ marginVertical: 20 }} />
      </ScrollView>
      <WarningModal visible={isWarningVisible} onClose={() => setWarningVisible(false)} />
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
    borderWidth: 1,
  },
  balanceTitle: {
    fontSize: 16,
    color: colors.subText,
    fontFamily: "Inter-Bold",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  balanceAmount: {
    fontSize: 32,
    color: colors.text,
    fontFamily: "Inter-Bold",
  },
  addCoinButton: {
    backgroundColor: colors.mainColor,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  addCoinText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text,
  },
  
};

export default MintsScreen;
