import React, { useCallback, useEffect, useState } from "react";
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

export default function DailyMenuCard({ navigation }) {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("학사 식단")}
      >
        {menuData ? (
          <>
            <Text style={styles.dateText}>{menuData.formatedDate}</Text>
            <Text style={styles.mealTypeText}>{menuData.dayDiv}</Text>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#ffcc99",
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
  },
  mealTypeText: {
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: "#ff9933",
    paddingBottom: 5,
  },
  menuList: {
    paddingTop: 10,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 2,
  },
});
