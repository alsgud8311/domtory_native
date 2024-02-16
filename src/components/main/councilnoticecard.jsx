import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getPostList } from "../../server/board";

export default function CouncilNoticeCard({ navigation }) {
  const [noticeData, setNoticeData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { success, data } = await getPostList("6");
      if (success) {
        const slicedData = data.slice(0, 5);
        setNoticeData(slicedData);
      } else {
        console.log(data);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>자율회 공지사항</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("자율회 공지사항")}
        >
          <Text>더 보기</Text>
          <AntDesign name="right" size={15} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        horizontal={true}
      >
        {noticeData ? (
          noticeData.map((notice, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate("글 보기", { postId: notice.id })
              }
            >
              <Text style={styles.postText}>{notice.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.postText}>정보를 가져오는데 실패했습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  scrollContainer: {
    paddingLeft: 10,
  },
  card: {
    width: 250,
    height: 100,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
  },
});
