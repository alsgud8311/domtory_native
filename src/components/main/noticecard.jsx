import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { openBrowserAsync } from "expo-web-browser";
import { useColorStore } from "../../store/colorstore";

export default function NoticeCard({ navigation }) {
  const [noticeData, setNoticeData] = useState(null);
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const { success, data } = await getNoticePageData("1");
        if (success) {
          slicedData = data.postList.slice(0, 3);
          setNoticeData(slicedData);
        } else {
          setNoticeData([{ title: "정보를 가져오지 못했습니다." }]);
        }
      };
      getData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>📢 학사 공지사항</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("공지사항", { div: "cbhs" })}
        >
          <Text style={styles.text}>더 보기</Text>
          <AntDesign name="right" size={15} style={styles.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {noticeData ? (
          noticeData.map((notice, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openBrowserAsync(notice.notice_url)}
              style={index !== noticeData.length - 1 ? styles.postItem : null} // Apply borderBottom only to non-last items
            >
              <Text style={styles.postDate}>{notice.date}</Text>
              <Text
                style={styles.postText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {notice.title}
              </Text>
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

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "#fff",
      marginBottom: 10,
      marginTop: 10,
    },
    description: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingTop: 15,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    descriptionText: {
      fontSize: 18,
      fontWeight: "600",
      color: darkmode ? "white" : "black",
    },
    moreButton: {
      flexDirection: "row",
    },
    card: {
      backgroundColor: darkmode ? "black" : "#fff",
      borderRadius: 10,
      borderColor: darkmode ? "gray" : "orange",
      borderStyle: "solid",
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingTop: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      gap: 10,
    },

    postItem: {
      borderBottomWidth: 0.5,
      borderColor: darkmode ? "gray" : "orange",
    },
    postText: {
      width: "100%",
      fontSize: 16,
      paddingTop: 5,
      paddingBottom: 15,
      color: darkmode ? "white" : "black",
    },
    postDate: {
      color: "gray",
      fontSize: 13,
    },
    text: {
      color: darkmode ? "white" : "black",
    },
  });
};
