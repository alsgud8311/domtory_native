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

export default function CommunityCard({ navigation }) {
  const [communityData, setCommunityData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { success, data } = await getLatestPosts("1");
        if (success) {
          setCommunityData(data);
        } else {
          setCommunityData([{ title: "정보를 가져오는데 실패했습니다." }]);
        }
      } catch (error) {
        setCommunityData([{ title: "정보를 가져오는데 실패했습니다." }]);
      }
    };
    console.log(communityData);
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>자유게시판</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("자유게시판")}
        >
          <Text>더 보기</Text>
          <AntDesign name="right" size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {communityData ? (
          <View>
            {communityData.map((post, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("자유 게시판", { postId: post.id })
                }
              >
                <Text style={styles.postText}>{post.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="orange" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
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
  },
  postText: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
