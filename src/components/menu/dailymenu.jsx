import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RecentPostCard() {
    const [recentPostData, setRecentPostData] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.day}>
                <Text style={styles.dayText}>02.05. (월) 식단</Text>
            </View>
            <View style={styles.meal}>
                <Text style={styles.mealText}>아침</Text>
                <View style={styles.card}>
                    <View>
                        <View style={styles.mealWrapper}>
                            <Text style={styles.mealText}>부대찌개</Text>
                            <Text style={styles.mealText}>현미밥</Text>
                            <Text style={styles.mealText}>배추김치</Text>
                            <Text style={styles.mealText}>콩나물불고기</Text>
                            <Text style={styles.mealText}>시금치무침</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.meal}>
                <Text style={styles.mealText}>점심</Text>
                <View style={styles.card}>
                    <View>
                        <View style={styles.mealWrapper}>
                            <Text style={styles.mealText}>점심 식단</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.meal}>
                <Text style={styles.mealText}>저녁</Text>
                <View style={styles.card}>
                    <View>
                        <View style={styles.mealWrapper}>
                            <Text style={styles.mealText}>저녁 식단</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    day: {
        width: "100%",
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    dayText: {
        fontSize: 18,
    },
    meal: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
    },
    mealText: {
        fontSize: 15,
        paddingBottom: 10,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderColor: "orange",
        borderStyle: "solid",
        borderWidth: 1,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
        marginTop: 5,
    },
    mealText: {
        fontSize: 16,
        paddingVertical: 3,
    },
    mealWrapper: {
        flexDirection: "colomn",
        justifyContent: "space-between",
    },
});
