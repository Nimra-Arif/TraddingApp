import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../assets/constants/colors';

const { width } = Dimensions.get("window");

const StockDetails = ({ priceColor }) => {
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
    MAX: Array.from({ length: 80 }, (_, i) => ({
      value: parseFloat((Math.exp(i / 30) * 3 + 5 + Math.random() * 2).toFixed(2)),
      date: `${1970 + i}`
    }))
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const stockPrices = timeframes[selectedTimeframe] || [];
  const [pointerValue, setPointerValue] = useState(
    stockPrices.length > 0 ? stockPrices[stockPrices.length - 1] : { value: 0, date: '' }
  );

  return (
    <View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${pointerValue?.value?.toFixed(2) || "N/A"}</Text>
        <View
          style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
          }}
          >
        <AntDesign
            name={pointerValue.value >= (stockPrices[stockPrices.length - 1]?.value || 0) ? "caretup" : "caretdown"}
            size={16}
            color={pointerValue.value >= (stockPrices[stockPrices.length - 1]?.value || 0) ? colors.buy : colors.sell}
          />
         <Text style={[
          styles.priceChange,
          { color: pointerValue.value >= (stockPrices[stockPrices.length - 1]?.value || 0) ? colors.buy : colors.sell }
        ]}>
          
          ${stockPrices.length > 0
            ? Math.abs(pointerValue.value - stockPrices[stockPrices.length - 1]?.value).toFixed(5)
            : "N/A"}
          ({stockPrices.length > 0
            ? ((pointerValue.value / stockPrices[stockPrices.length - 1]?.value - 1) * 100).toFixed(2)
            : "N/A"}%)
          <Text style={styles.priceSubText}>
            {selectedTimeframe === "MAX" ? " All time" : 
             selectedTimeframe === "LIVE" ? " Past hour" :
             selectedTimeframe === "4H" ? " Past 4 hours" :
             selectedTimeframe === "1D" ? " Past day" :
             ` Past ${selectedTimeframe}`}
          </Text>
          
        </Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          curved
          areaChart
          data={stockPrices}
          rotateLabel
          labelsExtraHeight={20}
          hideDataPoints
          spacing={width / stockPrices.length}
          adjustToWidth
          color={priceColor}
          height={300}
          thickness={1.5}
          startFillColor={priceColor}
          endFillColor="transparent"
          startOpacity={0.3}
          endOpacity={0}
          initialSpacing={0}
          hideYAxisText
          rulesType="dotted"
          rulesColor="transparent"
          xAxisColor="transparent"
          width={width}
          pointerConfig={{
            showPointerStrip: true,
            pointerStripWidth: 1,
            pointerStripColor: colors.accents,
            pointerStripDashedArray: [3, 3],
            pointerColor: "transparent",
            pointerRadius: 0,
            pointerLabelWidth: 100,
            pointerLabelHeight: 30,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: true,
            stripOverPointer: true,
            stripHeight: 320,
            pointerVanishDelay: 0,
            onPointSelected: (items) => {
              if (items.length > 0 && items[0]?.value !== undefined) {
                setPointerValue(items[0]);
              }
            },
            pointerLabelComponent: (items) => (
              <View style={styles.pointerLabel}>
                <Text style={styles.pointerLabelText}>
                  {items[0]?.date || "N/A"}
                </Text>
              </View>
            ),
          }}
        />
      </View>

      <View style={styles.timeframeContainer}>
        {Object.keys(timeframes).map((timeframe) => (
          <TouchableOpacity
            key={timeframe}
            onPress={() => {
              if (timeframes[timeframe]) {
                setSelectedTimeframe(timeframe);
                const newStockPrices = timeframes[timeframe] || [];
                setPointerValue(newStockPrices.length > 0 ? newStockPrices[newStockPrices.length - 1] : { value: 0, date: '' });
              }
            }}
            style={[
              styles.timeframeButton,
              { borderColor: priceColor },
              selectedTimeframe === timeframe && { backgroundColor: priceColor }
            ]}
          >
            <Text style={[
              styles.timeframeText,
              { color: priceColor },
              selectedTimeframe === timeframe && { color: colors.background }
            ]}>
              {timeframe}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  price: {
    fontSize: 36,
    color: colors.text,
    fontWeight: "bold"
  },
  priceChange: {
    fontSize: 13,
    marginBottom: 5,
    marginLeft:2,
  },
  priceSubText: {
    color: colors.subText,
    fontSize: 13
  },
  chartContainer: {
    width: width,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 0,
    marginLeft: -10,
    marginRight: 0,
    marginTop: 10,
  },
  pointerLabel: {
    position: 'absolute',
    top: -15,
    backgroundColor: 'transparent',
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  pointerLabelText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "500"
  },
  timeframeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40
  },
  timeframeButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: colors.background
  },
  timeframeText: {
    // fontWeight: "bold",
    fontSize: 14,
  },
});

export default StockDetails;

