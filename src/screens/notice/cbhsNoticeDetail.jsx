import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getNoticeIdData } from "../../server/cbhsnotice";

const CbhsNoticeDetail = () => {

  const [noticeData, setNoticeData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getNoticeIdData(310); // 비동기 함수를 기다림
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
      <Text>{noticeData.title}</Text>
    </View>
  )
};

export default CbhsNoticeDetail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
});
