import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getLatestPosts } from "../../server/board";
import { Octicons } from "@expo/vector-icons";

export default function RecentPostCard({ navigation }) {
  const [recentPostData, setRecentPostData] = useState(null);
  const boardList = {
    1: "자유게시판",
    2: "중고거래 게시판",
    3: "취준생 게시판",
    4: "번개 게시판",
    5: "분실물 게시판",
  };

  useEffect(() => {
    const getData = async () => {
      const { success, data } = await getLatestPosts("0");
      if (success) {
        setRecentPostData(data);
      } else {
        console.log(data);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>새로 올라온 글</Text>
      </View>
      {recentPostData ? (
        recentPostData.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate("글 보기", { postId: data.id })}
          >
            <View>
              <View style={styles.postWrapper}>
                <Text style={styles.postText}>익명</Text>
                <Text style={styles.postText}>{boardList[data.board]}</Text>
              </View>
              <Text style={styles.postText}>{data.title}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingBottom: 5,
                  gap: 5,
                }}
              >
                <Text>{data.comment_cnt}</Text>
                <Octicons name="comment" style={styles.commentIcon} />
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <TouchableOpacity style={styles.card}>
          <View>
            <Text style={styles.postText}>정보를 가져오는데 실패했습니다.</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  description: {
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
  },
  moreButton: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#ffffff",
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
    marginBottom: 15,
  },
  postText: {
    fontSize: 16,
    paddingTop: 10,
  },
  postWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
