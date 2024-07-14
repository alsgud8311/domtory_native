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
import { getLatestPosts } from "../../server/board";
import { useFocusEffect } from "@react-navigation/native";
import { useColorStore } from "../../store/colorstore";

export default function CommunityCard({ navigation }) {
  const [communityData, setCommunityData] = useState(null);
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const { success, data } = await getLatestPosts("1");
          if (success) {
            setCommunityData(data);
          } else {
            setCommunityData([{ title: "정보를 가져오는데 실패했습니다." }]);
          }
        } catch (error) {
          setCommunityData([{ title: "정보를 가져오는데 실패했습니다." }]);
        }
      };
      console.log(communityData);
      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>자유게시판</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate("자유게시판")}
        >
          <Text style={styles.text}>더 보기</Text>
          <AntDesign name="right" size={15} style={styles.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {communityData ? (
          <View>
            {communityData.map((post, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("자유 게시판", {
                    postId: post.id,
                    memberId: post.member,
                  })
                }
                style={
                  index !== communityData.length - 1
                    ? styles.postItem
                    : styles.postLastItem
                } // Apply borderBottom only to non-last items
              >
                <Text
                  style={styles.postText}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {post.title}
                </Text>
                <Text style={styles.postDate}>{post.created_at}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="orange" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "#fff",
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
      fontWeight: "600",
      color: darkmode ? "#fff" : "black",
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
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      paddingVertical: 5,
    },
    postItem: {
      borderBottomWidth: 0.5,
      borderColor: darkmode ? "gray" : "orange",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      gap: 10,
      justifyContent: "space-between",
    },
    postLastItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      gap: 10,
      justifyContent: "space-between",
    },
    postText: {
      width: "80%",
      fontSize: 16,
      paddingTop: 5,
      color: darkmode ? "#fff" : "black",
    },
    postDate: {
      fontSize: 12,
      color: "gray",
    },
    text: {
      color: darkmode ? "white" : "black",
    },
  });
};
