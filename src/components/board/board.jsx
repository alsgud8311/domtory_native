import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
} from "react-native";
import NewPost from "./newPost";
import { AntDesign } from "@expo/vector-icons";
import { getPostList } from "../../server/board";
import PostListItems from "./postListItem";

export default function Board({ boardId, navigation }) {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const result = await getPostList(boardId, currPage);
      if (success) {
        console.log(result.data);
        setData((prevData) => [...prevData, ...result.data.postList]);
        setTotalPage(result.data.pageCnt);
      } else {
        throw new Error("No data");
      }
    } catch (error) {
      Alert.alert("정보를 가져오는데 실패했습니다.");
      navigation.pop();
    }
  }, [boardId, currPage, navigation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenNewPost = () => {
    setModalVisible(true);
  };

  const handleCloseNewPost = () => {
    setModalVisible(false);
  };

  const handleNewPostSubmit = () => {
    setData([]);
    setCurrPage(1);
    fetchData();
  };

  const handleLoadMore = () => {
    if (currPage < totalPage) {
      setCurrPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={({ item }) => (
          <PostListItems item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 20 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <TouchableOpacity onPress={handleOpenNewPost} style={styles.writeButton}>
        <AntDesign name="form" size={24} color={"#fff"} />
      </TouchableOpacity>

      <NewPost
        isVisible={isModalVisible}
        onClose={handleCloseNewPost}
        boardId={boardId}
        onPostSubmit={handleNewPostSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flex: 1,
    marginBottom: 65,
  },
  // 글 박스
  item: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 15,
    paddingBottom: 10,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: "#5a5a5a",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 11,
    color: "#5a5a5a",
    marginRight: 6,
    paddingRight: 5,
    borderRightWidth: 1,
    borderRightColor: "#5a5a5abf",
  },
  commentIcon: {
    fontSize: 15,
    marginRight: 5,
    color: "crimson",
  },
  comment_cnt: {
    fontSize: 12,
    color: "crimson",
  },
  title: {
    fontSize: 14,
    paddingRight: 10,
    fontWeight: "700",
    marginBottom: 2.5,
  },
  content: {
    paddingRight: 10,
    fontSize: 13,
    marginBottom: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  // 글쓰기 버튼
  writeButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    width: 50,
    height: 50,
    borderRadius: 28,
    backgroundColor: "#ffa451",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#5a5a5a",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
