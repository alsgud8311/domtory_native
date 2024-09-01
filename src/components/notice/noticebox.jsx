import React, { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import Pagination from "../../components/notice/pagination";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import NewPost from "../board/newPost";
import { getCouncilNotice } from "../../server/notice";
import { openBrowserAsync } from "expo-web-browser";
import { useAuth } from "../../store/AuthContext";
import { useColorStore } from "../../store/colorstore";
import { apiBe } from "../../server";

export default function Noticebox({ div, navigation }) {
  const { authState } = useAuth();
  const [data, setData] = useState("");
  const [category, setCategory] = useState("cbhs");
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  // 카테고리 변경
  const onCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  useEffect(() => {
    fetchPosts(1);
  }, [category]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cbhsTotalPages, setCbhsTotalPages] = useState(0);
  const [councilTotalPages, setCouncilTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // 페이지 데이터를 불러오는 함수
  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      let response;
      if (category === "council") {
        const councilNoticeResult = await getCouncilNotice();
        if (councilNoticeResult.success) {
          setData(councilNoticeResult.data.postList);
          setCbhsTotalPages(councilNoticeResult.data.pageCnt);
          setCurrentPage(councilNoticeResult.data.curPage);
        } else {
          console.error(error);
        }
      } else {
        let apiUrl = `https://api.domtory.site/notice/?page=${page}`;
        response = await apiBe.get(apiUrl);
        setData(response.data.postList);
        setCbhsTotalPages(response.data.pageCnt);
        setCurrentPage(response.data.curPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (div === "council") {
      setCategory("council");
    }
    fetchPosts(currentPage);
  }, []);

  console.log(data);

  // 페이지 변경 함수
  const onPageChange = (newPage) => {
    fetchPosts(newPage);
  };

  // 자율회 공지사항 글쓰기
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenNewPost = () => {
    setModalVisible(true);
  };

  const handleCloseNewPost = () => {
    setModalVisible(false);
  };

  // 자율회 공지사항 글쓰기 후 성공적으로 글이 작성되면 호출될 함수
  const handlePostSuccess = () => {
    fetchPosts(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.select}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => onCategoryChange("cbhs")}>
            <Text style={category === "cbhs" ? styles.active : styles.inactive}>
              학사
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onCategoryChange("council")}>
            <Text
              style={category === "council" ? styles.active : styles.inactive}
            >
              자율회
            </Text>
          </TouchableOpacity>
        </View>
        {category === "council" && authState.staff === "YES" && (
          <TouchableOpacity onPress={handleOpenNewPost}>
            <AntDesign name="form" style={styles.writeText} />
          </TouchableOpacity>
        )}
      </View>

      <NewPost
        isVisible={isModalVisible}
        onClose={handleCloseNewPost}
        onSuccess={handlePostSuccess}
        council="true"
      />

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (category === "council") {
                navigation.navigate("자율회 공지사항", { postId: item.id });
              } else {
                openBrowserAsync(item.notice_url);
              }
            }}
          >
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: darkmode ? "black" : "white" }}
            >
              <ListItem.Content style={styles.content}>
                <ListItem.Subtitle style={styles.number}>
                  {item.id}
                </ListItem.Subtitle>
                <ListItem.Title style={styles.title}>
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.date}>
                  {item.date}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.id.toString()}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />

      <Pagination
        totalPages={cbhsTotalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </SafeAreaView>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "white",
      flex: 1,
      marginBottom: 60,
    },
    listHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 30,
      backgroundColor: darkmode ? "black" : "white",
    },
    number: {
      flex: 0.5,
      fontSize: 13,
      color: darkmode ? "white" : "black",
    },
    title: {
      flex: 3.5,
      fontSize: 13,
      marginRight: 15,
      color: darkmode ? "white" : "black",
    },
    date: {
      flex: 1,
      fontSize: 11,
      color: darkmode ? "white" : "black",
    },
    select: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      paddingBottom: 0,
      borderBottomWidth: 1.5,
      borderBottomColor: "rgba(211, 211, 211, 0.7)",
      backgroundColor: darkmode ? "black" : "white",
    },
    active: {
      padding: 10,
      paddingHorizontal: 30,
      fontSize: 15,
      fontWeight: "600",
      borderBottomWidth: 2,
      borderBottomColor: "#ffa451",
      color: "#ffa451",
    },
    inactive: {
      padding: 10,
      paddingHorizontal: 30,
      fontSize: 15,
      fontWeight: "400",
      color: darkmode ? "gray" : "black",
    },
    writeText: {
      padding: 10,
      paddingHorizontal: 20,
      fontSize: 20,
    },
  });
};
