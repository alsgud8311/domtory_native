import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { getNoticeIdData } from "../../server/cbhsnotice";

const CbhsNoticeDetail = () => {

  const [noticeData, setNoticeData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getNoticeIdData(94); // 비동기 함수를 기다림
      setNoticeData(data); // 데이터 설정
      console.log(data);
    })();
  }, []);

  if (!noticeData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{noticeData.title}</Text>
      <View style={styles.info}>
        <Text style={styles.cbhs}>충북학사</Text>
        <Text style={styles.date}>{noticeData.date}</Text>
      </View>
      {noticeData.images &&
        <Image
          source={{ uri: noticeData.images }}
          style={styles.image}
          resizeMode="contain"
        />
      }
      <Text style={styles.content}>{noticeData.content}</Text>
    </ScrollView>
  )
};

export default CbhsNoticeDetail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    borderBottomColor: "orange",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cbhs: {
    fontSize: 12,    
  },
  date: {
    fontSize: 12,    
  },
  content: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  image: {
    width: "100%", // 이미지 너비
    aspectRatio: 13 / 16,
    marginTop: 20,
    marginBottom: 10,
  }

});
