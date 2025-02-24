import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LineGraph } from "react-native-graph";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import GainsModal from "./GainsModal";

const { width } = Dimensions.get("window");

const StockDetails2 = ({ priceColor }) => {
  const hideTimeoutRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const generateTimestampData = useCallback((length, interval) => {
    // Use a fixed seed for consistent random numbers
    const now = Date.now();
    const seed = 42; // Fixed seed for consistent randomness
    
    // Create a simple pseudo-random function with seed
    const seededRandom = (index) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
    useEffect(() => {
      if (pointerValue && pointerValue.value !== undefined && (percentageChange > 19 || pointerValue.value > 19)) {
        setShowModal(true);
      }
    }, [pointerValue, percentageChange]);
    
    
    
    return Array.from({ length }, (_, i) => ({
      value: parseFloat((Math.sin(i / 5) * 3 + 16 + seededRandom(i) * 2).toFixed(2)),
      date: now - i * interval, // Generates timestamps in milliseconds
    }));
  }, []);

  // Create timeframes data only once
  const timeframesRef = useRef({
    LIVE: generateTimestampData(50, 60 * 1000), // 1-minute intervals
    "4H": generateTimestampData(60, 4 * 60 * 1000), // 4-minute intervals
    "1D": generateTimestampData(100, 60 * 60 * 1000), // 1-hour intervals
    "1W": generateTimestampData(70, 7 * 24 * 60 * 60 * 1000), // 1-week intervals
    MAX: generateTimestampData(80, 365 * 24 * 60 * 60 * 1000), // 1-year intervals
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const stockPrices = timeframesRef.current[selectedTimeframe] || [];
  
  // Ensure valid stock prices
  const validStockPrices = stockPrices.filter(
    (item) => item && typeof item.value === "number" && typeof item.date === "number"
  );

  // Track the selected price based on user interaction
  const [pointerValue, setPointerValue] = useState(
    validStockPrices.length > 0 ? validStockPrices[validStockPrices.length - 1] : { value: 0, date: Date.now() }
  );

  // State to track if the indicator line should be visible
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(false);
  const [selectedPointX, setSelectedPointX] = useState(0);

  const handlePointSelected = useCallback((index) => {
    if (validStockPrices[index]) {
      setPointerValue(validStockPrices[index]);
    }
  }, [validStockPrices]);

  // Memoize touch event handlers to prevent recreation on every render
  const handleTouchStart = useCallback(() => {
    setIsIndicatorVisible(true);
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      const touchX = event.nativeEvent.locationX;
      setSelectedPointX(touchX);
  
      // Find the closest data point
      const closestIndex = Math.min(
        Math.max(0, Math.round((touchX / width) * (validStockPrices.length - 1))),
        validStockPrices.length - 1
      );
  
      if (validStockPrices[closestIndex]) {
        setPointerValue(validStockPrices[closestIndex]);
        setIsIndicatorVisible(true);
  
        // Reset the timeout for auto-hiding
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
          setIsIndicatorVisible(false);
          setPointerValue(validStockPrices[validStockPrices.length - 1]); // Set to last value
        }, 1000); // Hide after 1 second of inactivity
      }
    },
    [validStockPrices]
  );
  
  const handleTouchEnd = useCallback(() => {
    setIsIndicatorVisible(false);
    setPointerValue(validStockPrices[validStockPrices.length - 1]); // Reset to last point
  }, [validStockPrices]);
  

  // Get the last value for comparison
  const lastValue = validStockPrices.length > 0 ? validStockPrices[validStockPrices.length - 1].value : 0;

  // Determine if the selected value is increasing or decreasing
  const isIncreasing = pointerValue.value >= lastValue;

  // Calculate price difference and percentage change
  const priceDifference = validStockPrices.length > 0 ? Math.abs(pointerValue.value - lastValue).toFixed(3) : "N/A";

  const percentageChange =
    validStockPrices.length > 0 && lastValue !== 0 ? ((pointerValue.value / lastValue - 1) * 100).toFixed(2) : "N/A";

  return (
    <View style={styles.container}>
      {/* Price Information */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${pointerValue?.value?.toFixed(2) || "N/A"}</Text>
        <View style={styles.priceChangeContainer}>
          <AntDesign name={isIncreasing ? "caretup" : "caretdown"} size={16} color={isIncreasing ? "#4ADE80" : "#FF4D4F"} />
          <Text style={[styles.priceChange, { color: isIncreasing ? "#4ADE80" : "#FF4D4F" }]}>
            ${priceDifference} ({percentageChange}%)
          </Text>
        </View>
      </View>

      {/* Graph Section */}
      <View 
        style={styles.chartContainer} 
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {validStockPrices.length > 0 ? (
          <>
            <LineGraph
              points={validStockPrices.map((item) => ({
                value: item.value,
                date: new Date(item.date),
              }))}
              animated={true}
              color={priceColor}
              enablePanGesture={false}
              // enablePanGesture={true}
              onPointSelected={handlePointSelected}
              enableFadeIn={true}
              gradientFillColors={[priceColor, "transparent", "transparent"]}
              lineThickness={1}
              height={250}
              width={width - 20}
              panGestureDelay={0}
              verticalPadding={20}
            />
            {/* Vertical Indicator Line - only visible when touching */}
            {isIndicatorVisible && (
              <View style={[styles.verticalLine, { left: selectedPointX, borderColor: "#888888" }]} />
            )}
          </>
        ) : (
          <Text style={{ textAlign: "center", color: colors.subText }}>No data available</Text>
        )}
      </View>

      {/* Timeframe Selection Buttons */}
      <View style={styles.timeframeContainer}>
        {Object.keys(timeframesRef.current).map((timeframe) => (
          <TouchableOpacity
            key={timeframe}
            onPress={() => {
              setSelectedTimeframe(timeframe);
              const newStockPrices = timeframesRef.current[timeframe] || [];
              const validNewPrices = newStockPrices.filter((item) => item && typeof item.value === "number");
              setPointerValue(validNewPrices.length > 0 ? validNewPrices[validNewPrices.length - 1] : { value: 0, date: Date.now() });
            }}
            style={[
              styles.timeframeButton,
              selectedTimeframe === timeframe
                ? { backgroundColor: priceColor, borderColor: priceColor }
                : { borderColor: priceColor, backgroundColor: "transparent" },
            ]}
          >
            <Text style={[styles.timeframeText, { color: selectedTimeframe === timeframe ? colors.background : priceColor }]}>
              {timeframe}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <GainsModal 
      visible={showModal} 
      onClose={() => setShowModal(false)} 
      percentageGain={percentageChange} 
      price={pointerValue.value} 
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  priceContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  price: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  priceChangeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceChange: {
    fontSize: 16,
    marginLeft: 4,
  },
  chartContainer: {
    width: width,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  timeframeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  timeframeButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 0,
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  verticalLine: {
    position: "absolute",
    top: 20,
    bottom: 20,
    width: 1,
    borderWidth: 0.75,
    borderStyle: "dashed",
  },
});

export default StockDetails2;