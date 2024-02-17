import { getNoticeIdData } from "../../server/councilnotice";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

const CouncilNoticeDetail = ({ route }) => {

  const [noticeData, setNoticeData] = useState(null);
  const { postId } = route.params;

  useEffect(() => {
    (async () => {
      const data = await getNoticeIdData(postId); // 비동기 함수를 기다림
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{noticeData.title}</Text>
        <View style={styles.info}>
          <Text style={styles.cbhs}>자율회</Text>
          <Text style={styles.date}>{noticeData.created_at}</Text>
        </View>
        {noticeData.images &&
          <Image
            source={{ uri: noticeData.post_image }}
            style={styles.post_image}
            resizeMode="contain"
          />
        }
        <Text style={styles.content}>{noticeData.body}</Text>
      </ScrollView>
    </View>
  )
};


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


export default CouncilNoticeDetail;
