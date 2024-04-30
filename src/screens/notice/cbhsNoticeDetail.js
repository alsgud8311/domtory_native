var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, } from "react-native";
import { getNoticeIdData } from "../../server/cbhsnotice";
const CbhsNoticeDetail = ({ route }) => {
    const { postId } = route.params;
    const [noticeData, setNoticeData] = useState(null);
    useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield getNoticeIdData(postId); // 비동기 함수를 기다림
            setNoticeData(data); // 데이터 설정
            console.log(data);
        }))();
    }, []);
    if (!noticeData) {
        return (<View style={styles.container}>
        <Text>Loading...</Text>
      </View>);
    }
    return (<View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{noticeData.title}</Text>
        <View style={styles.info}>
          <Text style={styles.cbhs}>충북학사</Text>
          <Text style={styles.date}>{noticeData.date}</Text>
        </View>
        {noticeData.images && (<Image source={{ uri: noticeData.images }} style={styles.image} resizeMode="contain"/>)}
        <Text style={styles.content}>{noticeData.content}</Text>
      </ScrollView>
    </View>);
};
export default CbhsNoticeDetail;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: "100%",
        backgroundColor: "#fff",
        padding: 20,
        overflow: "scroll",
    },
    title: {
        fontSize: 18,
        borderBottomColor: "orange",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    cbhs: {
        fontSize: 12,
    },
    date: {
        fontSize: 12,
    },
    content: {
        fontSize: 14,
        paddingVertical: 10,
        paddingTop: 15,
        paddingBottom: 80,
    },
    image: {
        width: "100%", // 이미지 너비
        aspectRatio: 13 / 16,
        marginTop: 10,
        marginBottom: 10,
    },
});
