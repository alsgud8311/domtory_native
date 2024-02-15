import React, { useState, useEffect } from 'react';
import PostDetail from '../../../components/board/postDetail';
import { getPostDetail } from '../../../server/board';
import { useRoute } from '@react-navigation/native';

export default function FleeMarketDetail() {
  const [data, setData] = useState({});
  const route = useRoute();
  const { postId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getPostDetail(postId);
            console.log(result);
            setData(result.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    fetchData();
}, [postId]);

  return (
    <PostDetail data={data}/>
  );
}
