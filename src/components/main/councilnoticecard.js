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
import { AntDesign } from "@expo/vector-icons";
import { getCouncilNoticeList, getPostList } from "../../server/board";
import { useFocusEffect } from "@react-navigation/native";
export default function CouncilNoticeCard({ navigation }) {
    const [noticeData, setNoticeData] = useState(null);
    useFocusEffect(useCallback(() => {
        const getData = () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield getCouncilNoticeList("1");
            if (success) {
                const slicedData = data.postList.slice(0, 5);
                setNoticeData(slicedData);
            }
            else {
                console.log(data);
            }
        });
        getData();
    }, []));
    return (<View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>자율회 공지사항</Text>
        <TouchableOpacity style={styles.moreButton} onPress={() => navigation.navigate("공지사항", { div: "council" })}>
          <Text>더 보기</Text>
          <AntDesign name="right" size={15}/>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollContainer} horizontal={true}>
        {noticeData ? (noticeData.map((notice, index) => (<TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("자율회 공지사항", { postId: notice.id })}>
              <Text style={styles.postText} ellipsizeMode="tail" numberOfLines={1}>
                {notice.title}
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 10, color: "dimgray" }} ellipsizeMode="tail" numberOfLines={2}>
                {notice.body}
              </Text>
              <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                <AntDesign name="right" size={15}/>
                <Text>더보기</Text>
              </View>
            </TouchableOpacity>))) : (<View style={styles.card}>
            <Text style={styles.postText}>정보를 가져오는데 실패했습니다.</Text>
          </View>)}
      </ScrollView>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 60,
    },
    description: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 15,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    descriptionText: {
        fontSize: 18,
        fontWeight: "600",
    },
    moreButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    scrollContainer: {
        paddingLeft: 10,
    },
    card: {
        width: 250,
        height: 110,
        marginRight: 20,
        justifyContent: "center",
        backgroundColor: "oldlace",
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
    },
    postText: {
        fontSize: 16,
        fontWeight: "600",
        paddingVertical: 2,
    },
});
