import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import getMenuData from "../../utils/getDate";
import { getDateMenuData } from "../../server/menu";

export default function DailyMenuCard({ navigation }) {
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("학사 식단")}
      >
        <Text style={styles.dateText}>{menuData.formatedDate}</Text>
        <Text style={styles.mealTypeText}>{menuData.dayDiv}</Text>
        <View style={styles.menuList}>
          {menuData ? (
            menuData.menuList.map((menu, index) => (
              <Text key={index} style={styles.menuItem}>
                {menu}
              </Text>
            ))
          ) : (
            <Text style={styles.menuItem}>현재 정보를 가져올 수 없습니다</Text>
          )}
        </View>
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
