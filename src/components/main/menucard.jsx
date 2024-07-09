import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import getMenuData from "../../utils/getDate";
import { getDateMenuData } from "../../server/menu";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useColorStore } from "../../store/colorstore";

export default function DailyMenuCard({ navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  const [menuData, setMenuData] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const data = await getDateMenuData(); // 비동기 함수를 기다림
          setMenuData(data); // 데이터 설정
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }, [])
  );

  const mealTime = {
    아침: "07:00~08:30\n간편식 제공은 06:00~",
    점심: "12:00~13:00",
    저녁: "18:00~20:00\n(방학의 경우 ~19:30까지)",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("학사 식단")}
      >
        {menuData ? (
          <>
            <Text style={styles.dateText}>{menuData.formatedDate}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.mealTypeText}>{menuData.dayDiv}</Text>
              <Text
                style={{
                  color: darkmode ? "lightgray" : "gray",
                  textAlign: "right",
                }}
              >
                {mealTime[menuData.dayDiv]}
              </Text>
            </View>
            <View style={styles.menuList}>
              {menuData.menuList.map((menu, index) => (
                <Text key={index} style={styles.menuItem}>
                  {menu}
                </Text>
              ))}
            </View>
          </>
        ) : (
          <Text style={styles.menuItem}>
            <ActivityIndicator size="large" color="orange" />
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "#fff",
    },
    card: {
      backgroundColor: darkmode ? "black" : "#ffcc99",
      borderWidth: darkmode ? 1 : 0,
      borderColor: darkmode ? "gray" : "",
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dateText: {
      fontSize: 24,
      marginBottom: 5,
      fontWeight: "600",
      color: darkmode ? "#fff" : "black",
    },
    mealTypeText: {
      fontSize: 24,
      borderBottomWidth: 2,
      borderColor: "#ff9933",
      paddingBottom: 5,
      fontWeight: "600",
      color: darkmode ? "#fff" : "black",
    },
    menuList: {
      paddingTop: 10,
    },
    menuItem: {
      fontSize: 15,
      paddingVertical: 2,
      color: darkmode ? "#fff" : "black",
    },
  });
};
