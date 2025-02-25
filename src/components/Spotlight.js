import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import colors from "../../assets/constants/colors";
import data from "../../assets/constants/data";
import icons from "../../assets/constants/icons"
const Spotlight = () => {
    return (
        <View style={styles.container}>
            <View
          style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            paddingHorizontal:10
          }}
          ><Image
          source={icons.spotlight_megaphone}
          style={{
              width:20,
              height:20,
          }}
           />
            <Text style={styles.sectionTitle}>
                Spotlight
            </Text></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.spotlight.map((item, index) => (
                    <View key={index} style={styles.spotlightCard}>
                        <View style={styles.spotlightCard2}>
                            <Image source={item.image} style={styles.spotlightImage} />
                            <View style={styles.spotlightContent}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.spotlightShortName}>{item.shortName}</Text>
                                    <Text style={styles.liveText}>● {item.status}</Text>
                                </View>
                                <Text style={styles.spotlightName}>{item.name}</Text>
                            </View>
                        </View>
                        <View style={styles.changeRow}>
                            <AntDesign name="caretdown" size={16} color={colors.sell} />
                            <Text style={[styles.spotlightChange, styles.redText]}>
                                {item.percent}
                            </Text>
                            <Text style={styles.spotlightSubText}>Past day</Text>
                        </View>

                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25,
        borderBottomColor: colors.accents,
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Inter-Bold",
        color: colors.text,
        marginLeft: 10,
        marginVertical: 20,
    },
    spotlightCard: {
        flexDirection: "column",
        // alignItems: "center",
        justifyContent:"center",
        backgroundColor: colors.background,
        borderColor: colors.accents,
        borderWidth: 1,
        borderRadius: 15,
        padding: 25,
        marginHorizontal: 10,
        marginRight:15,
        width: 360,
        height: 140,
    },
    spotlightCard2: {
        flexDirection: "row",
        alignItems: "center",
        
    },
    spotlightImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    spotlightContent: {
        flex: 1,
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    spotlightShortName: {
        fontSize: 12,
        color: colors.subText,
        fontFamily: "Inter-Bold",
    },
    spotlightName: {
        fontSize: 18,
        color: colors.text,
        fontFamily: "Inter-Bold",
    },
    liveText: {
        fontSize: 14,
        color: colors.mainColor,
        fontFamily: "Inter-Bold",
    },
    changeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft:5
    },
    spotlightChange: {
        fontSize: 14,
        fontFamily: "Inter-Bold",
        marginLeft: 5,
    },
    spotlightSubText: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        color: colors.subText,
        marginLeft: 8,
    },
    redText: {
        color: colors.sell,
    },
});

export default Spotlight;
