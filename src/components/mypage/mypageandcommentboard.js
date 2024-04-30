var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Platform, Alert, } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { getMyCommentList, getMyPostList } from "../../server/mypost";
import { useFocusEffect } from "@react-navigation/native";
export default function MypageAndCommentBoard({ post, navigation }) {
    const [data, setData] = useState(null);
    useFocusEffect(useCallback(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            if (post === "post") {
                try {
                    const { success, postData } = yield getMyPostList();
                    if (success) {
                        setData(postData);
                    }
                    else {
                        Alert.alert("정보를 불러오는데 실패했습니다.");
                        navigation.pop();
                    }
                }
                catch (error) {
                    Alert.alert("정보를 불러오는데 실패했습니다");
                    navigation.pop();
                }
            }
            else {
                try {
                    const result = yield getMyCommentList();
                    if (result && result.data) {
                        setData(result.data);
                    }
                    else {
                        Alert.alert("정보를 불러오는데 실패했습니다.");
                        navigation.pop();
                    }
                }
                catch (error) {
                    Alert.alert("정보를 불러오는데 실패했습니다");
                    navigation.pop();
                }
            }
        });
        fetchData();
    }, []));
    const renderItem = ({ item }) => {
        const boardId = {
            1: "자유 게시판",
            2: "중고거래게시판",
            3: "취준생게시판",
            4: "번개모임게시판",
            5: "분실물게시판",
        };
        return (<TouchableOpacity onPress={() => navigation.navigate(boardId[item.board], {
                postId: item.id,
                memberId: item.member,
            })}>
        <View style={styles.item}>
          {/* 제목, 내용 */}
          <View style={{ width: "80%" }}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.content} ellipsizeMode="tail" numberOfLines={2}>
              {item.body}
            </Text>

            {/* 유저, 작성일 */}
            <View style={{ flexDirection: "row", marginTop: 7, height: 15 }}>
              <Text style={styles.date}>{item.created_at}</Text>
              <Octicons name="comment" style={styles.commentIcon}/>
              <Text style={styles.comment_cnt}>{item.comment_cnt}</Text>
            </View>
          </View>
          {/* 사진 */}
          {item.thumbnail_url && (<View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: 10,
                }}>
              <Image source={{ uri: item.thumbnail_url }} style={styles.image}/>
            </View>)}
        </View>
      </TouchableOpacity>);
    };
    return (<SafeAreaView style={styles.container}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={{ paddingVertical: 20 }}/>
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        flex: 1,
        marginBottom: 65,
    },
    // 글 박스
    item: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 15,
        paddingBottom: 10,
        marginVertical: 6,
        marginHorizontal: 10,
        shadowColor: "#5a5a5a",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 11,
        color: "#5a5a5a",
        marginRight: 6,
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: "#5a5a5abf",
    },
    commentIcon: {
        fontSize: 15,
        marginRight: 5,
        color: "crimson",
    },
    comment_cnt: {
        fontSize: 12,
        color: "crimson",
    },
    title: {
        paddingRight: 10,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2.5,
    },
    content: {
        paddingRight: 10,
        fontSize: 13,
        marginBottom: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    // 글쓰기 버튼
    writeButton: {
        position: "absolute",
        right: 20,
        bottom: 40,
        width: 50,
        height: 50,
        borderRadius: 28,
        backgroundColor: "#ffa451",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#5a5a5a",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
});
