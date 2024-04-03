import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getPopularpost, popularpost } from "../../server/board";
import acorn from "../../assets/like_icon.png";
import { AntDesign } from "@expo/vector-icons";

export default function PopularPostCard({ navigation }) {
  const [data, setData] = useState(null);

  const getData = async () => {
    const { success, data } = await getPopularpost();
    if (success) {
      setData(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

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
          data.postList.map((post, key) => (
            <TouchableOpacity key={key} style={styles.post}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={styles.likedCnt}>
                <Image source={acorn} style={{ width: 15, height: 15 }}></Image>
                <Text>{post.likes_cnt}</Text>
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
    marginTop: 10,
    backgroundColor: "bisque",
  },
  description: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 15,
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
