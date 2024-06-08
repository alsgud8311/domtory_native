import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getPopularpost, popularpost } from "../../server/board";
import acorn from "../../assets/like_icon.png";
import { AntDesign, Octicons } from "@expo/vector-icons";

export default function PopularPostCard({ navigation }) {
  const [data, setData] = useState(null);

  const getData = async () => {
    const { success, data } = await getPopularpost();
    if (success) {
      setData(data.postList.slice(0, 5));
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const boardList = {
    1: "자유 게시판",
    2: "중고거래게시판",
    3: "취준생게시판",
    4: "번개모임게시판",
    5: "분실물게시판",
  };

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.description}>
        <Text style={styles.title}>🔥 핫도토리 게시판</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("핫도토리 게시판")}
        >
          <Text>더 보기</Text>
          <AntDesign name="right" size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {data ? (
          data.map((post, key) => (
            <TouchableOpacity
              key={key}
              style={styles.post}
              onPress={() =>
                navigation.navigate(boardList[post.board], {
                  postId: post.id,
                  memberId: post.member,
                })
              }
            >
              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={styles.likedCnt}>
                  <Image
                    source={acorn}
                    style={{ width: 15, height: 15 }}
                  ></Image>
                  <Text>{post.likes_cnt}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Octicons name="comment" style={{ color: "crimson" }} />
                  <Text style={{ color: "crimson" }}>{post.comment_cnt}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>정보를 불러올 수 없습니다.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 10,
    backgroundColor: "bisque",
  },
  description: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 5,
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
  title: {
    fontSize: 17,
    fontWeight: "600",
    paddingLeft: 10,
  },
  post: {
    paddingVertical: 15,
    borderBottomColor: "orange",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postTitle: {
    fontSize: 15,
  },
  likedCnt: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
