import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getNoticePageData } from "../../server/cbhsnotice";
import { useFocusEffect } from "@react-navigation/native";

export default function NoticeCard({ navigation }) {
  const [noticeData, setNoticeData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const { success, data } = await getNoticePageData("1");
        if (success) {
          slicedData = data.postList.slice(0, 5);
          setNoticeData(slicedData);
        } else {
          setNoticeData([{ title: "정보를 가져오지 못했습니다." }]);
        }
      };
      getData();
    }, [])
  );

  const navigateToDetailPage = (postId) => {
    navigation.navigate("학사내 공지사항", { postId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>학사 공지사항</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("공지사항")}
        >
          <Text>더 보기</Text>
          <AntDesign name="right" size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {noticeData ? (
          noticeData.map((notice, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToDetailPage(notice.id)}
              style={index !== noticeData.length - 1 ? styles.postItem : null} // Apply borderBottom only to non-last items
            >
              <Text style={styles.postDate}>{notice.date}</Text>
              <Text style={styles.postText}>{notice.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
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
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  postItem: {
    borderBottomWidth: 0.5,
    borderColor: "orange",
  },
  postText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },
  postDate: {
    fontSize: 13,
  },
});
