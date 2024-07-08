import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getCouncilNoticeList, getPostList } from "../../server/board";
import { useFocusEffect } from "@react-navigation/native";
import { useColorStore } from "../../store/colorstore";

export default function CouncilNoticeCard({ navigation }) {
  const [noticeData, setNoticeData] = useState(null);
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const { success, data } = await getCouncilNoticeList("1");
        if (success) {
          const slicedData = data.postList.slice(0, 5);
          setNoticeData(slicedData);
        } else {
          console.log(data);
        }
      };
      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>자율회 공지사항</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("공지사항", { div: "council" })}
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
                navigation.navigate("자율회 공지사항", { postId: notice.id })
              }
            >
              <Text
                style={styles.postText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {notice.title}
              </Text>
              <Text
                style={styles.postBody}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {notice.body}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <AntDesign name="right" size={15} />
                <Text>더보기</Text>
              </View>
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

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      backgroundColor: darkmode ? "black" : "#fff",
      marginBottom: 60,
    },
    description: {
      alignItems: "center",
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
      fontWeight: "600",
      color: darkmode ? "#fff" : "black",
    },
    moreButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    scrollContainer: {
      paddingLeft: 10,
    },
    card: {
      width: 250,
      height: 110,
      marginRight: 20,
      justifyContent: "center",
      backgroundColor: darkmode ? "black" : "oldlace",
      borderRadius: 10,
      borderColor: darkmode ? "gray" : "orange",
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
      fontWeight: "600",
      paddingVertical: 2,
      color: darkmode ? "#fff" : "black",
    },
    postBody: {
      fontSize: 14,
      marginBottom: 10,
      color: darkmode ? "white" : "dimgray",
    },
  });
};
