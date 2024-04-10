import React, { useState, useEffect, useCallback } from "react";
import PostDetail from "../../../components/board/postDetail";
import { getPostDetail } from "../../../server/board";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";

export default function BookmarkDetail({ navigation }) {
  const [data, setData] = useState({});
  const route = useRoute();
  const { postId } = route.params;

  const reloadData = async () => {
    const result = await getPostDetail(postId);
    if (result.success && !result.data.is_blocked && !result.data.is_deleted) {
      console.log(result);
      setData(result.data);
    } else {
      Alert.alert("삭제되거나 차단 조치된 게시물입니다.");
      navigation.pop();
    }
  };

  useFocusEffect(
    useCallback(() => {
      reloadData();
    }, [postId])
  );

  return <PostDetail data={data} reloadData={reloadData} postId={postId} />;
}
