import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions ,Image} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

// Complex fluctuating data with numerical values
const timeframes = {
  LIVE: Array.from({ length: 50 }, (_, i) => ({
    value: parseFloat((Math.sin(i / 4) * 2 + 16 + Math.random() * 1.5).toFixed(2)),
    date: `${10 + Math.floor(i / 6)}:${(i % 6) * 10} AM`
  })),
  
  "4H": Array.from({ length: 60 }, (_, i) => ({
    value: parseFloat((Math.sin(i / 5) * 3 + 16.5 + Math.random() * 2).toFixed(2)),
    date: `${Math.floor(i / 4)}:${(i % 4) * 15} AM`
  })),

  "1D": Array.from({ length: 100 }, (_, i) => ({
    value: parseFloat((Math.sin(i / 10) * 4 + 17 + Math.random() * 3).toFixed(2)),
    date: `${Math.floor(i / 4)} AM`
  })),

  "1W": Array.from({ length: 50 }, (_, i) => ({
    value: parseFloat((Math.sin(i / 6) * 5 + 16.5 + Math.random() * 4).toFixed(2)),
    date: `Day ${i + 1}`
  })),

  MAX: Array.from({ length: 80 }, (_, i) => ({
    value: parseFloat((Math.exp(i / 30) * 3 + 5 + Math.random() * 2).toFixed(2)),
    date: `${2010 + i}`
  }))
};

const HomeScreen = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const stockPrices = timeframes[selectedTimeframe];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a1a' }} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'left', paddingTop:0, }}>
      <View style={{ paddingTop: 10 ,paddingLeft: 20,}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          
          {/* Center Text */}
          <View>
            <Text style={{ color: 'gray', fontSize: 14 }}>TRUMP • Moonshot</Text>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>OFFICIAL TRUMP</Text>
          </View>
        </View>
                {/* Price Section */}
                <Text style={{ fontSize: 36, color: 'white', fontWeight: 'bold' }}>${stockPrices[stockPrices.length - 1].value}</Text>
        <Text style={{ fontSize: 16, color: 'red', marginBottom: 10 }}>
          ▼ ${Math.abs(stockPrices[stockPrices.length - 1].value - stockPrices[0].value).toFixed(3)} 
          ({((stockPrices[stockPrices.length - 1].value / stockPrices[0].value - 1) * 100).toFixed(3)}%) 
          <Text style={{ color: 'gray' }}> Past {selectedTimeframe}</Text>
        </Text>
      </View>


        {/* Line Chart */}
        <View style={{ width: '100%', height: 350, justifyContent: 'center', alignItems: 'center' }}>
        <LineChart
            curved
            areaChart
            data={stockPrices}
            rotateLabel
            labelsExtraHeight={20}
            hideDataPoints
            spacing={Math.min(20, width / stockPrices.length)} 
            adjustSpacing
            color="pink"
            height={300} 
            thickness={1}
            startFillColor="pink"
            endFillColor="pink"
            startOpacity={0.3}
            endOpacity={0.1}
            initialSpacing={0}
            hideYAxisText
            rulesType="solid"
            rulesColor="transparent"
            xAxisColor="transparent"
            pointerConfig={{
              showPointerStrip: true,
              pointerStripWidth: 2,
              pointerStripColor: "lightgray",
              pointerColor: "white",
              radius: 5,
              pointerLabelWidth: 100,
              pointerLabelHeight: 50,
              activatePointersOnLongPress: false,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items) => {
                return (
                  <View style={{
                    height: 50,
                    width: 100,
                    justifyContent: "center",
                    borderRadius: 8,
                    backgroundColor: "white",
                    padding: 10,
                    alignItems: "center",
                  }}>
                    <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>{items[0].date}</Text>
                    <Text style={{ fontWeight: "bold", textAlign: "center", color: "black" }}>
                      ${items[0].value}
                    </Text>
                  </View>
                );
              },
            }}
          />
        </View>

        {/* Timeframe Selector */}
        <View style={{ flexDirection: "row", margin: 20 }}>
          {Object.keys(timeframes).map((timeframe) => (
            <TouchableOpacity
              key={timeframe}
              onPress={() => setSelectedTimeframe(timeframe)}
              style={{
                marginHorizontal: 5,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 20,
                backgroundColor: selectedTimeframe === timeframe ? "pink" : "transparent",
                borderColor: "pink",
                borderWidth: 1,
              }}
            >
              <Text style={{ color: selectedTimeframe === timeframe ? "black" : "pink", fontWeight: "bold" }}>
                {timeframe}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Your Balance Section */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Your balance</Text>
        
        {/* Value & Quantity */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ color: 'gray', fontSize: 18 }}>Value</Text>
          <Text style={{ color: 'gray', fontSize: 18 }}>Quantity</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text style={{ color: 'white', fontSize: 22 }}>$0.00</Text>
          <Text style={{ color: 'white', fontSize: 22 }}>0</Text>
        </View>

        {/* Divider Line */}
        <View style={{ height: 1, backgroundColor: '#333', marginVertical: 15 }} />
      </View>

      {/* About Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>About</Text>

        {/* Market Cap */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="bar-chart-outline" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Market cap</Text>
          </View>
          <Text style={{ color: 'gray', fontSize: 18 }}>$16.7B</Text>
        </View>

        {/* Volume */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="fire" size={24} color="white" />
            <View>
              <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Volume</Text>
              <Text style={{ color: 'gray', fontSize: 14, marginLeft: 10 }}>Past 24h</Text>
            </View>
          </View>
          <Text style={{ color: 'gray', fontSize: 18 }}>$104M</Text>
        </View>

        {/* Holders */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="people-outline" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Holders</Text>
          </View>
          <Text style={{ color: 'gray', fontSize: 18 }}>648K</Text>
        </View>

        {/* Circulating Supply */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="chart-pie" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Circulating supply</Text>
          </View>
          <Text style={{ color: 'gray', fontSize: 18 }}>1.0B</Text>
        </View>

        {/* Created Date */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="leaf" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Created</Text>
          </View>
          <Text style={{ color: 'gray', fontSize: 18 }}>22d 13h ago</Text>
        </View>
      </View>

      {/* Buy Button */}
      <View style={{ padding: 20, alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={{
          width: '100%',
          backgroundColor: '#16C784',
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
