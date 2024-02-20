import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";

import { Octicons } from "@expo/vector-icons";
import { getMyCommentList, getMyPostList } from "../../server/mypost";
import { useFocusEffect } from "@react-navigation/native";

export default function MypageAndCommentBoard({ post, navigation }) {
  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (post === "post") {
          try {
            const { success, postData } = await getMyPostList();
            if (success) {
              setData(postData);
            } else {
              Alert.alert("정보를 불러오는데 실패했습니다.");
              navigation.pop();
            }
          } catch (error) {
            Alert.alert("정보를 불러오는데 실패했습니다");
            navigation.pop();
          }
        } else {
          try {
            const result = await getMyCommentList();
            if (result && result.data) {
              setData(result.data);
            } else {
              Alert.alert("정보를 불러오는데 실패했습니다.");
              navigation.pop();
            }
          } catch (error) {
            Alert.alert("정보를 불러오는데 실패했습니다");
            navigation.pop();
          }
        }
      };
      fetchData();
    }, [])
  );

  const renderItem = ({ item }) => {
    const boardId = {
      1: "자유 게시판",
      2: "중고거래게시판",
      3: "취준생게시판",
      4: "번개모임게시판",
      5: "분실물게시판",
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(boardId[item.board], {
            postId: item.id,
            memberId: item.member,
          })
        }
      >
        <View style={styles.item}>
          <View style={{ flexDirection: "column", marginBottom: 5 }}>
            {/* 제목, 내용 */}
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>{item.body}</Text>
            </View>
            {/* 유저, 작성일 */}
            <View style={{ flexDirection: "row", marginTop: 7, height: 15 }}>
              <Text style={styles.date}>{item.created_at}</Text>
              <Octicons name="comment" style={styles.commentIcon} />
              <Text style={styles.comment_cnt}>{item.comment_cnt}</Text>
            </View>
          </View>
          {/* 사진 */}
          {item.thumbnail_url && (
            <Image source={{ uri: item.thumbnail_url }} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </SafeAreaView>
  );
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
    color: "#666666",
  },
  comment_cnt: {
    fontSize: 12,
    color: "#5a5a5a",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2.5,
  },
  content: {
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
