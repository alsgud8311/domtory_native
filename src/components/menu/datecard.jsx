import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RecentPostCard from "./dailymenu";
import { useColorStore } from "../../store/colorstore";

export default function Menu() {
  const currentDate = new Date();
  const options = { month: "2-digit", day: "2-digit", weekday: "short" };
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  // 오늘 날짜로 초기화
  const [selectedDate, setSelectedDate] = useState(
    currentDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "")
  );

  // 날짜 선택할 때
  const handleDateSelection = (date) => {
    const koreanDate = date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "");
    setSelectedDate(koreanDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        horizontal={true}
      >
        <TouchableOpacity onPress={() => handleDateSelection(currentDate)}>
          <View style={styles.card}>
            <Text style={styles.dateText}>
              {currentDate.toLocaleDateString("ko-KR", options)}
            </Text>
          </View>
        </TouchableOpacity>

        {[...Array(6).keys()].map((index) => {
          const nextDate = new Date();
          nextDate.setDate(currentDate.getDate() + index + 1);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDateSelection(nextDate)}
            >
              <View style={styles.card}>
                <Text style={styles.dateText}>
                  {nextDate.toLocaleDateString("ko-KR", options)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.mealInf}>
        <Text style={styles.timeInf}>
          조식: 07:00~08:30 {"\n"}간편식 제공은 06:00부터(방학에는 06:30부터)
        </Text>
        <Text style={styles.timeInf}>중식: 12:00~13:00</Text>
        <Text style={styles.timeInf}>
          석식: 18:00~20:00 (방학에는 ~19:30까지)
        </Text>
      </View>
      <RecentPostCard selectedDate={selectedDate} />
    </View>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      backgroundColor: darkmode ? "black" : "white",
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
      backgroundColor: darkmode ? "orange" : "#ffcc99",
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
      color: darkmode ? "white" : "black",
    },
    mealInf: {
      paddingHorizontal: 15,
      paddingTop: 20,
    },
    timeInf: {
      color: "gray",
    },
  });
};
