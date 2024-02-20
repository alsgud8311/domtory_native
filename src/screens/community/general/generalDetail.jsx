import React, { useState, useEffect } from "react";
import PostDetail from "../../../components/board/postDetail";
import { getPostDetail } from "../../../server/board";
import { useRoute } from "@react-navigation/native";

export default function GeneralDetail() {
  const [data, setData] = useState({});
  const route = useRoute();
  const { postId } = route.params;

  const reloadData = async () => {
    try {
      const result = await getPostDetail(postId);
      console.log(result);
      setData(result.data);
      console.log("reload");
    } catch (error) {
      console.error("Failed to reload data:", error);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  return <PostDetail data={data} reloadData={reloadData} postId={postId} />;
}
