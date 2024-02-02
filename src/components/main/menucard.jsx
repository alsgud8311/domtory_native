import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import getMenuData from "../../utils/getDate";
import { getDateMenuData } from "../../server/menu";

export default function DailyMenuCard() {
  const [menuData, setMenuData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getDateMenuData(); // 비동기 함수를 기다림
      setMenuData(data); // 데이터 설정
      console.log(data);
    })();
  }, []);

  if (!menuData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.dateText}>{menuData.formatedDate}</Text>
        <Text style={styles.mealTypeText}>{menuData.dayDiv}</Text>
        <View style={styles.menuList}>
          {menuData.menuList.map((menu, index) => (
            <Text key={index} style={styles.menuItem}>
              {menu}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
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
