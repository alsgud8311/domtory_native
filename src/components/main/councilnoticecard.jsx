import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CouncilNoticeCard() {
  const [noticeData, setNoticeData] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>자율회 공지사항</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Text>더 보기</Text>
          <AntDesign name="right" size={15} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer} horizontal={true}>
        <View style={styles.card}>
          <Text style={styles.postText}>자유게시판 글 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.postText}>자유게시판 글 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.postText}>자유게시판 글 1</Text>
        </View>
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
    borderColor: "#000",
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
