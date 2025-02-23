import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, StyleSheet, Animated ,Modal} from 'react-native';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../assets/constants/colors';
import StockDetails from '../../components/StockDetails';
import StockInfo from '../../components/StockInfo';
import icons from "../../../assets/constants/icons"
import DepositScreen from '../DepositScreen';
const { width } = Dimensions.get("window");

const StocksScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const isUp = item.up;
  const priceColor = isUp ? colors.buy : colors.sell;
  const [showHeaderCoin, setShowHeaderCoin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("Deposit"); // Default to Deposit
  
  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };
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
        {showHeaderCoin && (
    <View style={styles.headerCoinInfo}>
      <Image source={item.image} style={styles.headerCoinImage} />
      <Text style={styles.headerCoinText}>{item.name}</Text>
    </View>
  )}

        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <AntDesign name="staro" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Ionicons name="share-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
  style={styles.scrollcontainer}
  showsVerticalScrollIndicator={false}
  onScroll={(event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowHeaderCoin(yOffset > 100); // Show logo & name when scrolling past 100px
  }}
  scrollEventThrottle={16} // Ensures smooth scrolling detection
>
        <View style={styles.coinInfo}>
          <Image source={item.image} style={styles.coinImage} />
          <View>
            <Text style={styles.coinTicker}>{item.name} • Pumpify</Text>
            <Text style={styles.coinName}>{item.fullName || "Stool Prisondente"}</Text>
          </View>
        </View>

        {/* Stock Details Component */}
        <StockDetails item={item} priceColor={priceColor} width={width} />

        {/* Stock Info Component */}
        <StockInfo />

      </ScrollView>

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

  {/* Buy & Sell Buttons */}
  <View style={styles.buttonRow}>
    {/* Conditionally Show Sell Button */}
    {item.holdsCoin && (
      <TouchableOpacity style={[styles.actionButton, styles.sellButton]}>
        <Image source={icons.sell_circle} style={styles.buttonIcon} />
        <Text style={styles.actionButtonText}>Sell</Text>
      </TouchableOpacity>
    )}

    {/* Buy Button */}
    <TouchableOpacity
      style={[styles.actionButton, styles.buyButton,{
        width:item.holdsCoin? "48%":"100%"
      }]}
      onPress={() => openModal("Deposit")}
    >
      <Image source={icons.dollar_circle} style={styles.buttonIcon} />
      <Text style={styles.actionButtonText}>Buy</Text>
    </TouchableOpacity>
  </View>
</View>
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
    <DepositScreen 
  type={modalType} 
  onClose={() => setModalVisible(false)} 
/>

    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", },
  scrollcontainer: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    padding: 10,
    backgroundColor: colors.background,
  },
  headerIcons: { flexDirection: "row" },
  coinInfo: { flexDirection: "row", alignItems: "center", marginTop: 30, paddingHorizontal: 10 },
  coinImage: { width: 50, height: 50, borderRadius: 50, marginRight: 10 },
  coinTicker: { color: colors.subText, fontSize: 14, fontFamily: "Antebas-Bold" },
  coinName: { color: colors.text, fontSize: 20, fontWeight: "bold", fontFamily: "Antebas-Bold" },

  // Buy Button Wrapper
  buyButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '49%', // Ensures two buttons fit side by side
    padding: 15,
    borderRadius: 10,
  },
  
  sellButton: {
    backgroundColor: colors.sellButton, // Use your red color
  },
  
  buyButton: {
    backgroundColor: colors.buyButton, // Use your green color
  },
  
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  
  actionButtonText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Antebas-Bold",
    // fontWeight: 'bold',
    textAlign: "center",
    marginLeft:-30,
    flex: 1,
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
  headerCoinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCoinImage: {
    width: 26,
    height: 26,
    borderRadius: 12,
    marginRight: 10,
  },
  headerCoinText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Antebas-Bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: colors.background,
    height: "95%", // Adjust height for better view
  },
});

export default StocksScreen;
