import React, { useState, useEffect, useCallback } from "react";
import PostDetail from "../../../components/board/postDetail";
import { getPostDetail } from "../../../server/board";
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function JobseekerDetail() {
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

  useFocusEffect(
    useCallback(() => {
      reloadData();
    }, [postId])
  );

  return <PostDetail data={data} reloadData={reloadData} postId={postId} />;
}
