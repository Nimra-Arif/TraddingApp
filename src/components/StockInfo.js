import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import colors from '../../assets/constants/colors';
import icons from "../../assets/constants/icons";
import data from "../../assets/constants/data"
const StockInfo = () => {
  return (
    <View style={styles.container}>

      {/* Your Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.sectionTitle}>Your balance</Text>

        {/* Value & Quantity */}
        <View style={styles.balanceInfo}>
          <View style={styles.row}>
            <Text style={styles.subText}>Value</Text>
            <Text style={styles.balanceValue}>$0.00</Text>
            
          </View>
          <View style={styles.row}>
          <Text style={styles.subText}>Quantity</Text>
            <Text style={styles.balanceValue}>0</Text>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About</Text>

        {/* Market Cap */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
          <Image source={icons.marketcap} style={styles.iconStyle} />
            <Text style={styles.infoText}>Market cap</Text>
          </View>
          <Text style={styles.infoValue}>$16.7B</Text>
        </TouchableOpacity>

        {/* Volume */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
          <Image source={icons.trending_volume_fire} style={styles.iconStyle} />

            <View
            >
              <Text style={styles.infoText}>Volume</Text>
              <Text style={styles.subText2}>Past 24h</Text>
            </View>
          </View>
          <Text style={styles.infoValue}>$104M</Text>
        </TouchableOpacity>

        {/* Holders */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}><Image source={icons.holders} style={styles.iconStyle} />
            <Text style={styles.infoText}>Holders</Text>
          </View>
          <Text style={styles.infoValue}>648K</Text>
        </TouchableOpacity>

        {/* Circulating Supply */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
          <Image source={icons.circulatingsupply} style={styles.iconStyle} />
            <Text style={styles.infoText}>Circulating supply</Text>
          </View>
          <Text style={styles.infoValue}>1.0B</Text>
        </TouchableOpacity>

        {/* Created Date */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
          <Image source={icons.Created_leaf} style={styles.iconStyle} />
            <Text style={styles.infoText}>Created</Text>
          </View>
          <Text style={styles.infoValue}>22d 13h ago</Text>
        </TouchableOpacity>
      </View>

      {data.disclaimer.map((paragraph, index) => (
        <Text key={index} style={styles.disclaimerText}>{paragraph}</Text>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: colors.background,
    paddingBottom:250,
  },
  balanceContainer: {
    paddingBottom: 30,
    borderBottomColor: colors.accents,
    borderBottomWidth: 1,
  },
  balanceInfo: {
    width: "100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:20,
    },
  
  row: { 
    display:"flex",
    flexDirection:"column",
    width:"50%",

  },
  
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginLeft: 5,
    // marginBottom:10,
  },
  subText: {
    color: colors.subText,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  subText2: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginLeft: 10,
    marginTop:5,
    // fontFamily: "Antebas-Regular",
  },
  balanceValue: {
    color: colors.text,
    fontSize: 22,
    fontFamily: "Inter-Regular",
  },
  aboutContainer: {
    paddingVertical: 40,
    borderBottomColor: colors.accents,
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: colors.text,
    fontSize: 17,
    fontFamily: "Inter-Bold",
    marginLeft: 10,
    fontWeight: '600',
  },
  infoValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: "Inter-Bold",
  },
  disclaimerText: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    marginTop: 20,
    lineHeight: 22,
  },
  iconStyle: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  
});

export default StockInfo;
