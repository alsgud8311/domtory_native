import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  RefreshControl,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NewPost from "./newPost";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { getPostList } from "../../server/board";
import Hyperlink from "react-native-hyperlink";
import PostListItems, { postListItems } from "./postListItem";

export default function Board({ boardId, navigation }) {
  const [data, setData] = useState([]);
  const [currPage, setcurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const result = await getPostList(boardId);
          if (result && result.data) {
            setData(result.data.postList);
            console.log("data");
            setTotalPage(result.data.pageCnt);
          } else {
            throw new Error("No data");
          }
        } catch (error) {
          Alert.alert("정보를 가져오는데 실패했습니다.");
          navigation.pop();
        }
      };
      fetchData();
    }, [boardId, refreshFlag, refreshing, currPage])
  );

  const handleOpenNewPost = () => {
    setModalVisible(true);
  };

  const handleCloseNewPost = () => {
    setModalVisible(false);
  };

  const handleNewPostSubmit = () => {
    setRefreshFlag(!refreshFlag);
  };

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
