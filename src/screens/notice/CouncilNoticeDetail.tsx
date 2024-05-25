import React, { useState, useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { getPostDetail } from "../../server/board";
import kingDomtory from "../../assets/council_domtory.png";
import Hyperlink from "react-native-hyperlink";
import { ParamList } from "../../models/route";

export default function CouncilNoticeDetail() {
  const [data, setData] = useState<PostDetailType | null>(null);
  const route = useRoute<RouteProp<ParamList, "sampleType">>();
  const { postId } = route.params;

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
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  return (
    <ScrollView
      style={{ width: "100%", backgroundColor: "white", padding: 20 }}
    >
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
          <Text style={{ fontSize: 18, paddingLeft: 10 }}>자율회 도토리</Text>
          <Text style={{ fontSize: 13, paddingLeft: 10, color: "gray" }}>
            {data.date}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", padding: 20, marginBottom: 80 }}>
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>{data.title}</Text>
        <Hyperlink linkDefault={true} linkStyle={{ color: "mediumblue" }}>
          <Text style={{ fontSize: 17 }}>{data.body}</Text>
        </Hyperlink>
      </View>
    </ScrollView>
  );
}
