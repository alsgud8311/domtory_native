import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RecentPostCard from "./dailymenu";


export default function Menu() {

    const currentDate = new Date();
    const options = { month: '2-digit', day: '2-digit', weekday: 'short' };

    // 오늘 날짜로 초기화
    const [selectedDate, setSelectedDate] = useState(currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\./g, ''));

    // 날짜 선택할 때
    const handleDateSelection = (date) => {
        const koreanDate = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\./g, '');
        setSelectedDate(koreanDate);
    };

    return (
            <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollContainer} horizontal={true}>
                    <TouchableOpacity onPress={() => handleDateSelection(currentDate)}>
                        <View style={styles.card}>
                            <Text style={styles.dateText}>{currentDate.toLocaleDateString('ko-KR', options)}</Text>
                        </View>
                    </TouchableOpacity>

                    {[...Array(6).keys()].map((index) => {
                        const nextDate = new Date();
                        nextDate.setDate(currentDate.getDate() + index + 1);

                        return (
                            <TouchableOpacity key={index} onPress={() => handleDateSelection(nextDate)}>
                                <View style={styles.card}>
                                    <Text style={styles.dateText}>{nextDate.toLocaleDateString('ko-KR', options)}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
            </ScrollView>
            <RecentPostCard selectedDate={selectedDate} />
            </View>

    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 10,
        flexDirection: "colomn",
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