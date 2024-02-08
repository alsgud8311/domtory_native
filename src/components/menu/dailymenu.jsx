import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { getLunchMenuData, getDinnerMenuData, getBreakMenuData } from "../../server/menu";


export default function RecentPostCard({ selectedDate }) {
    const [recentPostData, setRecentPostData] = useState(null);
    
    function convertDateToCustomFormat(dateString) {
        const originalDate = new Date(dateString);
        const day = originalDate.getUTCDate().toString().padStart(2, '0');
        const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = originalDate.getUTCFullYear().toString().slice(2, 4);
      
        return year + month + day;
      }

    const options = { month: '2-digit', day: '2-digit', weekday: 'short' };



    const [breakData, setBreakData] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await getBreakMenuData(convertDateToCustomFormat(selectedDate)); 
            setBreakData(data && data[0] && data[0].breakfast_list); 

        })();
    }, [selectedDate]);

    const [lunchData, setLunchData] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await getLunchMenuData(convertDateToCustomFormat(selectedDate)); 
            setLunchData(data && data[0] && data[0].lunch_list); 
        })();
    }, [selectedDate]);

    const [dinnerData, setDinnerData] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await getDinnerMenuData(convertDateToCustomFormat(selectedDate)); 
            setDinnerData(data && data[0] && data[0].dinner_list); 
        })();
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            <View style={styles.day}>
                <Text style={styles.dayText}>{selectedDate.toLocaleDateString('ko-KR', options)} 식단</Text>
            </View>
            <View style={styles.meal}>
                <View style={styles.card}>
                    <View>
                        <View style={styles.mealWrapper}>
                            <Text style={styles.timeText}>아침</Text>
                            {breakData && breakData.map((item, index) => (
                                <Text key={index} style={styles.mealText}>{item}</Text>
                            ))}

                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.meal}>
                <View style={styles.card}>
                    <View>
                        <View style={styles.mealWrapper}>
                            <Text style={styles.timeText}>점심</Text>
                            {lunchData && lunchData.map((item, index) => (
                                <Text key={index} style={styles.mealText}>{item}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.meal}>
                <View style={styles.card}>
                    <View>
                        <View style={styles.mealWrapper}>
                            <Text style={styles.timeText}>저녁</Text>
                            {dinnerData && dinnerData.map((item, index) => (
                                <Text key={index} style={styles.mealText}>{item}</Text>
                            ))}
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
    timeText: {
        fontSize: 15,
        borderBottomColor: 'orange',
        borderBottomWidth: 1,
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
        fontSize: 15,
        paddingTop: 7,
    },
    mealWrapper: {
        flexDirection: "colomn",
        justifyContent: "space-between",
    },
});
