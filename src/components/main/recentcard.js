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
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getLatestPosts } from "../../server/board";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import domtory from "../../assets/domtory_icon.png";
import acorn from "../../assets/like_icon.png";
export default function RecentPostCard({ navigation }) {
    const [recentPostData, setRecentPostData] = useState(null);
    const boardList = {
        1: "자유 게시판",
        2: "중고거래게시판",
        3: "취준생게시판",
        4: "번개모임게시판",
        5: "분실물게시판",
    };
    useFocusEffect(useCallback(() => {
        const getData = () => __awaiter(this, void 0, void 0, function* () {
            const { success, data } = yield getLatestPosts("0");
            if (success) {
                setRecentPostData(data);
            }
            else {
                console.log(data);
            }
        });
        getData();
    }, []));
    return (<View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>새로 올라온 글</Text>
      </View>
      {recentPostData ? (recentPostData.map((data, index) => (<TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(boardList[data.board], {
                postId: data.id,
                memberId: data.member,
            })}>
            <View style={{
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                gap: 10,
            }}>
              <View style={{
                width: 115,
                paddingVertical: 5,
                borderRightColor: "orange",
                borderRightWidth: 1,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text>{boardList[data.board]}</Text>
              </View>
              <View style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
            }}>
                <Text style={{ padding: 5, width: "70%" }} ellipsizeMode="tail" numberOfLines={1}>
                  {data.title}
                </Text>
                <View style={styles.likeAndCommentsWrapper}>
                  <View style={styles.likedCnt}>
                    <Image source={acorn} style={{ width: 15, height: 15 }}></Image>
                    <Text>{data.likes_cnt}</Text>
                  </View>
                  <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
            }}>
                    <Octicons name="comment" style={{ color: "crimson" }}/>
                    <Text style={{ color: "crimson" }}>{data.comment_cnt}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>))) : (<TouchableOpacity style={styles.card}>
          <View>
            <Text style={styles.postText}>정보를 가져오는데 실패했습니다.</Text>
          </View>
        </TouchableOpacity>)}
    </View>);
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
    },
    description: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
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
    card: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderColor: "orange",
        borderStyle: "solid",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
    },
    postText: {
        fontSize: 16,
        paddingLeft: 5,
    },
    postWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    likedCnt: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    likeAndCommentsWrapper: {
        flexDirection: "row",
        gap: 8,
    },
});
