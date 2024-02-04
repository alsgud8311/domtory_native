import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";


export default function Menu() {

    const currentDate = new Date();
    const options = { month: '2-digit', day: '2-digit', weekday: 'short' };

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollContainer} horizontal={true}>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{currentDate.toLocaleDateString('ko-KR', options)}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{new Date(currentDate.setDate(currentDate.getDate() + 1)).toLocaleDateString('ko-KR', options)}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{new Date(currentDate.setDate(currentDate.getDate() + 1)).toLocaleDateString('ko-KR', options)}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{new Date(currentDate.setDate(currentDate.getDate() + 1)).toLocaleDateString('ko-KR', options)}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{new Date(currentDate.setDate(currentDate.getDate() + 1)).toLocaleDateString('ko-KR', options)}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{new Date(currentDate.setDate(currentDate.getDate() + 1)).toLocaleDateString('ko-KR', options)}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.dateText}>{new Date(currentDate.setDate(currentDate.getDate() + 1)).toLocaleDateString('ko-KR', options)}</Text>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    scrollContainer: {
        paddingLeft: 10,
    },
    card: {
        width: 80,
        height: 30,
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffcc99",
        borderRadius: 10,
        padding: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dateText: {
        fontSize: 14,
        paddingVertical: 5,
    },
});
