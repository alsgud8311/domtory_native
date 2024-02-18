import React, { useState, useEffect } from "react";
import { getPostDetail } from "../../server";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";

export default function CouncilNoticeDetail() {
  const [data, setData] = useState({});
  const route = useRoute();
  const { postId } = route.params;

  const reloadData = async () => {
    try {
      const result = await getPostDetail(postId);
      console.log(result);
      setData(result.data);
    } catch (error) {
      console.error("Failed to reload data:", error);
    }
  };

  useEffect(() => {
    reloadData();
  }, [postId]);

  return <View></View>;
}
