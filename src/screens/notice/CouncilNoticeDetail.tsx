import React, { useState, useEffect, useMemo } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getPostDetail } from "../../server/board";
import kingDomtory from "../../assets/council_domtory.png";
import Hyperlink from "react-native-hyperlink";
import { ParamList } from "../../models/route";
import { useColorStore } from "../../store/colorstore";

export default function CouncilNoticeDetail() {
  const [data, setData] = useState<PostDetailType | null>(null);
  const route = useRoute<RouteProp<ParamList, "sampleType">>();
  const { postId } = route.params;
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  const reloadData = async () => {
    try {
      const result = await getPostDetail(postId);
      console.log(result);
      setData(result.data as PostDetailType);
    } catch (error) {
      console.error("Failed to reload data:", error);
    }
  };

  useEffect(() => {
    reloadData();
  }, [postId]);

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={kingDomtory}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#fff5d3",
            borderRadius: 15,
          }}
        />
        <View>
          <Text style={{ ...styles.text, fontSize: 18, paddingLeft: 10 }}>
            자율회 도토리
          </Text>
          <Text style={{ fontSize: 13, paddingLeft: 10, color: "gray" }}>
            {data.date}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", padding: 20, marginBottom: 80 }}>
        <Text style={styles.title}>{data.title}</Text>
        <Hyperlink linkDefault={true} linkStyle={{ color: "mediumblue" }}>
          <Text style={styles.body}>{data.body}</Text>
        </Hyperlink>
      </View>
    </ScrollView>
  );
}
const createStyles = (darkmode) => {
  return StyleSheet.create({
    errorContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: darkmode ? "black" : "white",
    },
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "white",
      padding: 20,
    },
    contentWrapper: {
      width: "100%",
      padding: 20,
      marginBottom: 80,
    },
    title: {
      fontSize: 20,
      paddingBottom: 20,
      color: darkmode ? "white" : "black",
    },
    body: {
      fontSize: 17,
      color: darkmode ? "white" : "black",
    },
    text: {
      color: darkmode ? "white" : "black",
    },
  });
};
