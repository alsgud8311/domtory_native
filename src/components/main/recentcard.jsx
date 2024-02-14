import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RecentPostCard() {
  const [recentPostData, setRecentPostData] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>새로 올라온 글</Text>
      </View>
      <View style={styles.card}>
        <View>
          <View style={styles.postWrapper}>
            <Text style={styles.postText}>닉네임</Text>
            <Text style={styles.postText}>자유게시판</Text>
          </View>
          <Text style={styles.postText}>새로 올라온 글 1</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <View style={styles.postWrapper}>
            <Text style={styles.postText}>닉네임</Text>
            <Text style={styles.postText}>자유게시판</Text>
          </View>
          <Text style={styles.postText}>새로 올라온 글 2</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View>
          <View style={styles.postWrapper}>
            <Text style={styles.postText}>닉네임</Text>
            <Text style={styles.postText}>자유게시판</Text>
          </View>
          <Text style={styles.postText}>새로 올라온 글 3</Text>
        </View>
      </View>
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
    paddingVertical: 5,
  },
  postWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
