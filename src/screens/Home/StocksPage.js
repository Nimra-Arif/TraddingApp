import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, StyleSheet, Animated } from 'react-native';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../assets/constants/colors';
import StockDetails from '../../components/StockDetails';
import StockInfo from '../../components/StockInfo';

const { width } = Dimensions.get("window");

const StocksScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const isUp = item.up;
  const priceColor = isUp ? colors.buy : colors.sell;

  // State for animating text above the buy button
  const [animatedValue] = useState(new Animated.Value(50)); // Start from bottom

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0, // Move to its position
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <AntDesign name="staro" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Ionicons name="share-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollcontainer} showsVerticalScrollIndicator={false}>

        {/* Coin Info */}
        <View style={styles.coinInfo}>
          <Image source={item.image} style={styles.coinImage} />
          <View>
            <Text style={styles.coinTicker}>{item.name} • Moonshot</Text>
            <Text style={styles.coinName}>{item.fullName || "Stool Prisondente"}</Text>
          </View>
        </View>

        {/* Stock Details Component */}
        <StockDetails item={item} priceColor={priceColor} width={width} />

        {/* Stock Info Component */}
        <StockInfo />

      </ScrollView>

      {/* Floating Buy Section */}
      <View style={styles.buyButtonWrapper}>
        <LinearGradient
          colors={['transparent', colors.background]} // Smooth gradient fade effect
          style={styles.gradientBackground}
        />

        {/* Animated Purchase Text */}
        <Animated.View style={[styles.purchaseTextContainer, { transform: [{ translateY: animatedValue }] }]}>
          <Ionicons name="person-circle-outline" size={18} color="white" />
          <Text style={styles.purchaseText}>
            bought <Text style={styles.purchaseAmount}>$3.0K</Text>
          </Text>
        </Animated.View>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton}
        onPress={() => navigation.navigate("DepositScreen")}
        >
          <FontAwesome5 name="dollar-sign" size={16} color="white" style={styles.buyButtonIcon} />
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  scrollcontainer: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  headerIcons: { flexDirection: "row" },
  coinInfo: { flexDirection: "row", alignItems: "center", marginTop: 30, paddingHorizontal: 10 },
  coinImage: { width: 50, height: 50, borderRadius: 50, marginRight: 10 },
  coinTicker: { color: colors.subText, fontSize: 14, fontFamily: "Antebas-Bold" },
  coinName: { color: colors.text, fontSize: 22, fontWeight: "bold", fontFamily: "Antebas-Bold" },

  // Buy Button Wrapper
  buyButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
  },

  // Gradient Background
  gradientBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100, // Adjust the height for smoother effect
  },

  // Animated Purchase Text
  purchaseTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -30, // Floating above the button
  },
  purchaseText: { color: 'white', fontSize: 14, marginLeft: 5, fontWeight: 'bold' },
  purchaseAmount: { color: colors.buy, fontWeight: 'bold' },

  // Buy Button
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.mainColor,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buyButtonIcon: { marginRight: 8 },
  buyButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default StocksScreen;
