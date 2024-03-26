import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getPopularpost, popularpost } from "../../server/board";
import acorn from "../../assets/acorn.png";

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
      console.log(data);
    }, [])
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.title}>🔥 핫도토리 게시판</Text>
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
          <Text>null</Text>
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
