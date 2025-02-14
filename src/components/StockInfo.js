import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import colors from '../../assets/constants/colors';
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
            <Text style={styles.subText}>Quantity</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.balanceValue}>$0.00</Text>
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
            <Ionicons name="bar-chart-outline" size={24} color="white" />
            <Text style={styles.infoText}>Market cap</Text>
          </View>
          <Text style={styles.infoValue}>$16.7B</Text>
        </TouchableOpacity>

        {/* Volume */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="fire" size={24} color="white" />
            <View
            >
              <Text style={styles.infoText}>Volume</Text>
              <Text style={styles.subText}>Past 24h</Text>
            </View>
          </View>
          <Text style={styles.infoValue}>$104M</Text>
        </TouchableOpacity>

        {/* Holders */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={24} color="white" />
            <Text style={styles.infoText}>Holders</Text>
          </View>
          <Text style={styles.infoValue}>648K</Text>
        </TouchableOpacity>

        {/* Circulating Supply */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
            <FontAwesome5 name="chart-pie" size={24} color="white" />
            <Text style={styles.infoText}>Circulating supply</Text>
          </View>
          <Text style={styles.infoValue}>1.0B</Text>
        </TouchableOpacity>

        {/* Created Date */}
        <TouchableOpacity style={styles.infoItem}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="leaf" size={24} color="white" />
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
    paddingTop: 30,
    backgroundColor: colors.background,
    paddingBottom:200,
  },
  balanceContainer: {
    paddingBottom: 30,
    borderBottomColor: colors.accents,
    borderBottomWidth: 1,
  },
  balanceInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontFamily: "Antebas-Bold",
  },
  subText: {
    color: colors.subText,
    fontSize: 16,
    marginLeft: 10,
    // fontFamily: "Antebas-Regular",
  },
  balanceValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
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
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  infoValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimerText: {
    color: colors.subText,
    fontSize: 14,
    marginTop: 20,
    lineHeight: 22,
  },
});

export default StockInfo;
