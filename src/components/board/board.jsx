import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
  View,
  Text,
} from "react-native";
import NewPost from "./newPost";
import { AntDesign } from "@expo/vector-icons";
import { getPostList } from "../../server/board";
import PostListItems from "./postListItem";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function Board({ boardId, navigation }) {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [goBackRefresh, setGoBackRefresh] = useState(false);
  const [lastCall, setLastCall] = useState(null);

  const fetchData = async () => {
    try {
      console.log("몇페이지", currPage);
      if (currPage === 0) {
        console.log("0 return");
        return;
      }
      const response = await getPostList(boardId, currPage);
      setTotalPage(response.data.pageCnt);
      if (currPage === 1) {
        setData(response.data.postList);
      } else {
        setData((prevData) => {
          // 새로운 데이터에서 중복을 제거한 데이터를 가져옴
          const newData = response.data.postList.filter(
            (newItem) =>
              !prevData.some((prevItem) => prevItem.id === newItem.id)
          );

          // 이전 데이터와 새로운 데이터를 합침
          return [...prevData, ...newData];
        });
      }
    } catch (error) {
      Alert.alert("정보를 가져오는데 실패했습니다.");
      navigation.pop();
    }
  };
  const refreshData = async (refreshPage) => {
    try {
      console.log("리프레시 페이지", refreshPage);
      const response = await getPostList(boardId, refreshPage);
      setTotalPage(response.data.pageCnt);
      if (currPage === 1) {
        setData(response.data.postList);
      } else {
        setData((prevData) => {
          // 새로운 데이터에서 중복을 제거한 데이터를 가져옴
          const newData = response.data.postList.filter(
            (newItem) =>
              !prevData.some((prevItem) => prevItem.id === newItem.id)
          );

          // 이전 데이터와 새로운 데이터를 합침
          return [...prevData, ...newData];
        });
      }
    } catch (error) {
      Alert.alert("정보를 가져오는데 실패했습니다.");
      navigation.pop();
    }
  };

  useFocusEffect(
    useCallback(() => {
      let pageToRefresh = currPage;
      for (let i = 1; i <= pageToRefresh; i++) {
        console.log("리프레시 for문");
        refreshData(i);
      }
    }, [boardId, navigation, currPage])
  );
  // useFocusEffect(
  //   useCallback(() => {
  //     if (currPage > 1) {
  //       fetchData();
  //     }
  //   }, [currPage])
  // );
  // useEffect(() => {
  //   fetchData();
  // const unsubscribe = navigation.addListener("focus", () => {
  //   setCurrPage(1);
  //   setGoBackRefresh(false);
  // });
  // return unsubscribe;
  // }, [fetchData, goBackRefresh]);

  const handleOpenNewPost = () => {
    setModalVisible(true);
  };

  const handleCloseNewPost = () => {
    setModalVisible(false);
  };

  const handleNewPostSubmit = () => {
    setData([]);
    setCurrPage(0);
    fetchData();
  };

  const handleLoadMore = () => {
    if (currPage < totalPage) {
      console.log("more?");
      setCurrPage((prev) => prev + 1);
    }
  };

  const onRefresh = () => {
    console.log("refresh");
    setRefreshing(true);
    setData([]);
    setCurrPage(0);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (!data) {
    return (
      <View style={styles.nodata}>
        <Text style={styles.nodataText}>현재 정보가 없습니다.</Text>
      </View>
    );
  }
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
      {boardId <= 5 && (
        <>
          <TouchableOpacity
            onPress={handleOpenNewPost}
            style={styles.writeButton}
          >
            <AntDesign name="form" size={24} color={"#fff"} />
          </TouchableOpacity>
          <NewPost
            isVisible={isModalVisible}
            onClose={handleCloseNewPost}
            boardId={boardId}
            onPostSubmit={handleNewPostSubmit}
          />
        </>
      )}
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
  nodata: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  nodataText: {
    fontSize: 20,
    color: "gray",
  },
});
