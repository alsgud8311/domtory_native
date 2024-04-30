var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from "react-native";
import getMenuData from "../../utils/getDate";
import { getDateMenuData } from "../../server/menu";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
export default function DailyMenuCard({ navigation }) {
    const [menuData, setMenuData] = useState(null);
    useFocusEffect(useCallback(() => {
        const getData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield getDateMenuData(); // 비동기 함수를 기다림
                setMenuData(data); // 데이터 설정
            }
            catch (error) {
                console.log(error);
            }
        });
        getData();
    }, []));
    const mealTime = {
        아침: "07:00~08:30\n간편식 제공은 06:00~",
        점심: "12:00~13:00",
        저녁: "18:00~20:00\n(방학의 경우 ~19:30까지)",
    };
    return (<View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("학사 식단")}>
        {menuData ? (<>
            <Text style={styles.dateText}>{menuData.formatedDate}</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
              <Text style={styles.mealTypeText}>{menuData.dayDiv}</Text>
              <Text style={{ color: "gray", textAlign: "right" }}>
                {mealTime[menuData.dayDiv]}
              </Text>
            </View>
            <View style={styles.menuList}>
              {menuData.menuList.map((menu, index) => (<Text key={index} style={styles.menuItem}>
                  {menu}
                </Text>))}
            </View>
          </>) : (<Text style={styles.menuItem}>
            <ActivityIndicator size="large" color="orange"/>
          </Text>)}
      </TouchableOpacity>
    </View>);
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
        fontWeight: "600",
    },
    mealTypeText: {
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: "#ff9933",
        paddingBottom: 5,
        fontWeight: "600",
    },
    menuList: {
        paddingTop: 10,
    },
    menuItem: {
        fontSize: 15,
        paddingVertical: 2,
    },
});
