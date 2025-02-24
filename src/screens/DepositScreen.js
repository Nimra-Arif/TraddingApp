import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PanResponder, Animated, TextInput, Image } from "react-native";
import { Ionicons, AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../assets/constants/colors";
import PaymentMethodsSheet from "../components/PaymentMethodsSheet";
import BalanceSelectionSheet from "../components/BalanceSelectionSheet";
import icons from "../../assets/constants/icons";

const { width } = Dimensions.get("window");

const DepositScreen = ({ navigation, route, type = "Deposit", onClose }) => {

    const [amount, setAmount] = useState(""); // Empty initially
    const [swipeX] = useState(new Animated.Value(0));
    const [showPaymentSheet, setShowPaymentSheet] = useState(false);
    const [showBalanceSheet, setShowBalanceSheet] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Apple Pay");
    const [selectedIcon, setSelectedIcon] = useState(<Image source={icons.apple_pay} style={{ width: 45, height: 20 }} />);
    const [selectedBalance, setSelectedBalance] = useState("Cash");
    const [balanceIcon, setBalanceIcon] = useState(<Image source={icons.dollar_circle} style={{ width: 17, height: 17 }} />);
    const [swipeEnabled, setSwipeEnabled] = useState(false); // Controls button enable/disable
    const [swiped, setSwiped] = useState(false); // Tracks if the button is swiped

    const handleAmountChange = (value) => {
        setAmount(value);
        setSwipeEnabled(value.trim().length > 0);
        setSwiped(false); // Reset swipe state when editing input
    };

    const handlePress = (value) => {
        if (value === "backspace") {
            const newAmount = amount.slice(0, -1);
            setAmount(newAmount);
            setSwipeEnabled(newAmount.length > 0);
            setSwiped(false);
        } else {
            const newAmount = amount === "0" ? value : amount + value;
            setAmount(newAmount);
            setSwipeEnabled(true);
            setSwiped(false);
        }
    };

    // Updated PanResponder code for proper swipe handling
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => swipeEnabled,
        onMoveShouldSetPanResponder: () => swipeEnabled,
        onPanResponderGrant: () => {
            // This ensures the animation doesn't jump when starting the swipe
            swipeX.setValue(0);
        },
        onPanResponderMove: (evt, gestureState) => {
            if (swipeEnabled && gestureState.dx >= 0 && gestureState.dx <= width - 100) {
                swipeX.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (_, gesture) => {
            if (!swipeEnabled) {
                Animated.spring(swipeX, { toValue: 0, useNativeDriver: false }).start();
                return;
            }

            if (gesture.dx > width * 0.5) { // Ensure enough swipe
                setSwiped(true);
                Animated.timing(swipeX, {
                    toValue: width - 120,
                    duration: 300,
                    useNativeDriver: false,
                }).start(() => {
                    // Handle deposit action completion here
                    console.log("Deposit action triggered");
                });
            } else {
                setSwiped(false);
                Animated.spring(swipeX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        }
    });
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{type}</Text>
                <TouchableOpacity
                    onPress={onClose ? onClose : () => navigation.goBack()}
                    style={styles.closeButton}
                >
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.balanceContainer} onPress={() => setShowBalanceSheet(true)}>
                {balanceIcon}
                <Text style={styles.balanceText}>{selectedBalance}: $0.00</Text>
                <AntDesign name="down" size={14} color="white" />
            </TouchableOpacity>
            <TextInput
                style={styles.amount}
                placeholder="$100"
                placeholderTextColor={colors.subText}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
            />

            {type != "Send" &&
                <TouchableOpacity style={styles.paymentContainer} onPress={() => setShowPaymentSheet(true)}>
                    {selectedIcon}
                    <Text style={styles.paymentText}>{paymentMethod}</Text>
                    <AntDesign name="down" size={14} color="white" />
                </TouchableOpacity>
            }

            {/* Quick Amount Options */}
            <View style={styles.quickAmounts}>
                {["30", "40", "50", "100"].map((val) => (
                    <TouchableOpacity key={val} style={styles.quickAmountButton} onPress={() => setAmount(val)}>
                        <Text style={styles.quickAmountText}>${val}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Numeric Keypad */}
            <View style={styles.keypad}>
                {[
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7", "8", "9"],
                    [".", "0", "backspace"],
                ].map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.keypadRow}>
                        {row.map((key) => (
                            <TouchableOpacity key={key} style={styles.keypadButton} onPress={() => handlePress(key)}>
                                {key === "backspace" ? (
                                    <Ionicons name="backspace" size={38} color={colors.text} />
                                ) : (
                                    <Text style={styles.keypadText}>{key}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>

            <View style={[
    styles.swipeWrapper,
    {
        opacity: swipeEnabled ? 1 : 0.5,
        borderColor: colors.accents,
    }
]}>
    {/* Background Fill - Covers swiped area fully */}
    <Animated.View
        style={[
            styles.swipeBackground,
            { width: Animated.add(swipeX, 50) } // Expands background including the button width
        ]}
    />

    {/* Swipe Button */}
    <Animated.View
        {...panResponder.panHandlers}
        style={[
            styles.swipeButton,
            {
                transform: [{ translateX: swipeX }],
                backgroundColor: swiped ? '#8c52ff' : (swipeEnabled ? colors.mainColor : colors.accents),
                width: 80, // Keep button width fixed
            }
        ]}
    >
        <AntDesign name="doubleright" size={24} color="white" />
    </Animated.View>

    {/* Swipe Text */}
    <Text style={[
        styles.swipeText,
        { 
            opacity: swiped ? 0 : 1,  // Hide text when swiped
            color: swipeEnabled ? colors.text : colors.subText
        }
    ]}>
        Swipe to {type}
    </Text>
</View>



            <PaymentMethodsSheet
                visible={showPaymentSheet}
                onClose={() => setShowPaymentSheet(false)}
                selectedMethod={paymentMethod}
                setSelectedMethod={setPaymentMethod}
                setSelectedIcon={setSelectedIcon}
            />
            <BalanceSelectionSheet
                visible={showBalanceSheet}
                onClose={() => setShowBalanceSheet(false)}
                selectedBalance={selectedBalance}
                setSelectedBalance={setSelectedBalance}
                setBalanceIcon={setBalanceIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 30,
        height: "100%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        position: "relative"
    },
    title: {
        color: colors.text,
        fontSize: 18,
        fontFamily: "Antebas-Bold",
        marginTop: 10,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accents,
    },
    balanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.accents,
        padding: 12,
        borderRadius: 20,
        width: "50%",
        alignSelf: "center"
    },
    balanceText: {
        color: colors.text,
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    },
    amount: {
        color: colors.text,
        fontSize: 60,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    paymentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.accents,
        padding: 12,
        borderRadius: 20,
        minWidth: "50%",
        alignSelf: "center"
    },
    paymentText: {
        color: colors.text,
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    },
    quickAmounts: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    quickAmountButton: {
        backgroundColor: colors.accents,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    quickAmountText: {
        color: colors.text,
        fontSize: 16,
    },
    keypad: {
        marginTop: 10
    },
    keypadRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    },
    keypadButton: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    keypadText: {
        color: "white",
        fontSize: 38,
        fontWeight: "bold"
    },
    swipeWrapper: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 50,
        height: 60,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
    },
    swipeButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 50,
        height: 60,
        zIndex: 1,
    },

    swipeText: {
        fontSize: 18,
        position: "absolute",
        width: "100%",
        textAlign: "center",
        zIndex: 0,
        fontFamily: "Antebas-Regular",
    },
    swipeBackground: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#8c52ff", // Color of swiped area
        borderRadius: 50,  // Ensures smooth rounded edges
        left: 0, // Start from the left edge
    },
    
    
});

export default DepositScreen;