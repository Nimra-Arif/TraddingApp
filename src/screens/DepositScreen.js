import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PanResponder, Animated,Image } from "react-native";
import { Ionicons, AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../assets/constants/colors";
import PaymentMethodsSheet from "../components/PaymentMethodsSheet";
import BalanceSelectionSheet from "../components/BalanceSelectionSheet";


const { width } = Dimensions.get("window");

const DepositScreen = ({ navigation }) => {
    const [amount, setAmount] = useState("100");
    const [swipeX] = useState(new Animated.Value(0));
    const [showPaymentSheet, setShowPaymentSheet] = useState(false);
    const [showBalanceSheet, setShowBalanceSheet] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Apple Pay");
    const [selectedIcon, setSelectedIcon] = useState(<FontAwesome5 name="apple" size={18} color="white" />);
    const [selectedBalance, setSelectedBalance] = useState("Cash");
    const [balanceIcon, setBalanceIcon] = useState(<FontAwesome5 name="dollar-sign" size={18} color="white" />);



    const handlePress = (value) => {
        if (value === "backspace") {
            setAmount(amount.slice(0, -1) || "0");
        } else {
            setAmount(amount === "0" ? value : amount + value);
        }
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dx > 0 && gestureState.dx < width - 100) {
                swipeX.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: () => {
            if (swipeX._value > width * 0.5) {
                Animated.timing(swipeX, {
                    toValue: width - 100,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            } else {
                Animated.timing(swipeX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Deposit</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Cash Balance */}
            <TouchableOpacity style={styles.balanceContainer} onPress={() => setShowBalanceSheet(true)}>
        {balanceIcon}
        <Text style={styles.balanceText}>{selectedBalance}: $0.00</Text>
        <AntDesign name="down" size={14} color="white" />
      </TouchableOpacity>


            {/* Amount */}
            <Text style={styles.amount}>${amount}</Text>

            <TouchableOpacity style={styles.paymentContainer} onPress={() => setShowPaymentSheet(true)}>
                {selectedIcon}
                <Text style={styles.paymentText}>{paymentMethod}</Text>
                <AntDesign name="down" size={14} color="white" />
            </TouchableOpacity>



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

            {/* Swipe to Deposit */}
            <View style={styles.swipeWrapper}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.swipeButton, { transform: [{ translateX: swipeX }] }]}
                >
                    <AntDesign name="forward" size={24} color={colors.subText} />

                </Animated.View>
                <Text style={styles.swipeText}>Swipe to Deposit</Text>
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
        setBalanceIcon={setBalanceIcon}  // ✅ Fix: Passing setBalanceIcon
      />
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 60,

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
        fontSize: 20,
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
        fontSize: 16,
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
        fontSize: 16,
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
        paddingVertical: 10,
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
        borderColor: colors.accents,
        borderRadius: 50,
        height: 60,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
    },
    swipeButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.accents,
        paddingVertical: 15,
        borderRadius: 50,
        width: 80,
        zIndex: 1,
        height: 60,
        // position: "absolute", 
    },

    swipeText: {
        color: colors.subText,
        fontSize: 18,
        marginLeft: 20,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "center",
        zIndex: 0,
        fontFamily: "Antebas-Regular",
    },
});

export default DepositScreen;
