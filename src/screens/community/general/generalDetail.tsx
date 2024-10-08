import React, { useState, useEffect, useCallback } from "react";
import PostDetail from "../../../components/board/postDetail";
import { getPostDetail } from "../../../server/board";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { ParamList } from "../../../models/route";

export default function GeneralDetail({ navigation }) {
  const [data, setData] = useState<PostDetailType | object>({});
  const route = useRoute<RouteProp<ParamList, "sampleType">>();
  const { postId } = route.params;

  const reloadData = async () => {
    const result = await getPostDetail(postId);
    if (
      result.success &&
      !result.data?.is_blocked &&
      !result.data?.is_deleted
    ) {
      console.log(result.data);
      setData(result.data as PostDetailType);
      console.log("wwwwww");
      console.log("wwwwww", data);
    } else {
      Alert.alert("삭제되거나 차단 조치된 게시물입니다.");
      navigation.pop();
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("?????", postId, data);
      reloadData();
    }, [postId])
  );

  return (
    <PostDetail
      data={data}
      reloadData={reloadData}
      postId={postId}
      navigation={navigation}
    />
  );
}
