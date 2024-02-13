import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function NoticeCard({ navigation }) {
  const [noticeData, setNoticeData] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>학사 공지사항</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("학사내 공지사항 글 보기")}
        >
          <Text>더 보기</Text>
          <AntDesign name="right" size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View>
          <Text style={styles.postText}>공지사항 글 1</Text>
          <Text style={styles.postText}>공지사항 글 2</Text>
          <Text style={styles.postText}>공지사항 글 3</Text>
        </View>
      </View>
    </ScrollView>
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
