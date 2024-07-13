import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Image,
  Alert, // 알림창을 사용하기 위해 추가
} from "react-native";
import { AntDesign, Octicons, MaterialIcons } from "@expo/vector-icons";
import { getSearhedData } from "../../server/search";
import { useColorStore } from "../../store/colorstore";

export default function Searchbox({ route, navigation }) {
  const textInputRef = useRef(null);
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  const renderItem = ({ item, board }) => {
    const Boardname = {
      1: "자유 게시판",
      2: "중고거래 게시판",
      3: "취준생 게시판",
      4: "번개모임 게시판",
      5: "분실물 게시판",
      6: "자율회 공지사항",
    };

    const navigateToDetailScreen = () => {
      let screenName;
      switch (item.board) {
        case 1:
          screenName = "자유 게시판";
          break;
        case 2:
          screenName = "중고거래게시판";
          break;
        case 3:
          screenName = "취준생게시판";
          break;
        case 4:
          screenName = "번개모임게시판";
          break;
        case 5:
          screenName = "분실물게시판";
          break;
        default:
          screenName = "일치하는 게시판 없음";
      }

      if (screenName !== "일치하는 게시판 없음") {
        navigation.navigate(screenName, { postId: item.id });
      } else {
        // 게시판이 일치하지 않는 경우의 처리 로직
      }
    };

    return (
      <TouchableOpacity onPress={navigateToDetailScreen}>
        <View style={styles.item}>
          <View style={{ flexDirection: "column", marginBottom: 5 }}>
            <View>
              {board == "전체 게시판" && (
                <Text style={styles.board}>{Boardname[item.board]}</Text>
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text
                style={styles.content}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {item.body}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 7, height: 15 }}>
              <Text style={styles.date}>{item.created_at}</Text>
              <Octicons style={styles.commenticon} name="comment" />
              <Text style={styles.comment}>{item.comment_cnt}</Text>
            </View>
          </View>
          {item.thumbnail_url && (
            <Image source={{ uri: item.thumbnail_url }} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const { board } = route.params;

  const Boardname = {
    "전체 게시판": 0,
    자유게시판: 1,
    "중고거래 게시판": 2,
    "취준생 게시판": 3,
    "번개모임 게시판": 4,
    "분실물 게시판": 5,
  };

  const [inputText, setInputText] = useState("");
  const [inputList, setInputList] = useState([]);

  const handleInputChange = (text) => {
    setInputText(text);
    const list = text.split(" ");
    // console.log(list)
    setInputList(list);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setInputText("");
    setData(null);
  };

  const [data, setData] = useState(null);

  const handleSearch = async () => {
    if (inputText.trim() === "") {
      Alert.alert("알림", "검색어를 입력해주세요."); // 검색어를 입력하지 않은 경우 알림창 띄우기
      return;
    }

    try {
      const searchData = await getSearhedData(inputList, Boardname[board]);
      setData(searchData);
      console.log(searchData);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    if (inputText.trim() === "") {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchcontainer}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.searchbox}
            placeholder="검색어를 입력하세요."
            placeholderTextColor={darkmode ? "white" : "black"}
            onChangeText={handleInputChange}
            value={inputText}
            onSubmitEditing={() => handleSearch()}
          />
          <View style={styles.searchbtn}>
            <TouchableOpacity onPress={() => handleSearch()}>
              <AntDesign name="search1" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={hideKeyboard}
          style={{ alignItems: "center", flex: 1 }}
        >
          <Text style={styles.canceltext}>취소</Text>
        </TouchableOpacity>
      </View>

      <View>
        {data ? (
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem({ item, board })}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.empty}>
            <AntDesign name="search1" size={30} color="gray" />
            <Text style={styles.emptyText}>{board}의 글을 검색해보세요</Text>
          </View>
        )}
        {data && data.length === 0 && (
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={30} color="gray" />
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: darkmode ? "black" : "#fff",
      marginBottom: 10,
      paddingBottom: 150,
    },
    searchcontainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: darkmode ? "gray" : "#f0f0f0",
      borderStyle: "solid",
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      alignItems: "center",
    },
    inputContainer: {
      width: "85%",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
    },
    searchbox: {
      height: 40,
      backgroundColor: darkmode ? "black" : "#f0f0f0",
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderColor: darkmode ? "gray" : "",
      borderWidth: darkmode ? 1 : 0,
      paddingLeft: 10,
      width: "90%",
      color: darkmode ? "white" : "black",
    },
    searchbtn: {
      backgroundColor: darkmode ? "black" : "#f0f0f0",
      height: 40,
      paddingRight: 10,
      paddingTop: 10,
      paddingLeft: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderColor: darkmode ? "gray" : "",
      borderWidth: darkmode ? 1 : 0,
    },
    canceltext: {
      fontSize: 15,
      color: darkmode ? "white" : "black",
    },
    item: {
      backgroundColor: darkmode ? "black" : "#ffffff",
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
    board: {
      fontSize: 13,
      color: "orange",
      paddingBottom: 5,
    },
    commenticon: {
      fontSize: 11,
      color: darkmode ? "#ff4d6d" : "crimson",
      marginRight: 3,
      paddingTop: 3,
    },
    comment: {
      fontSize: 12,
      color: darkmode ? "#ff4d6d" : "crimson",
      marginRight: 5,
    },
    date: {
      fontSize: 12,
      color: darkmode ? "lightgray" : "#5a5a5a",
      marginRight: 6,
      paddingRight: 5,
      borderRightWidth: 1,
      borderRightColor: "#5a5a5abf",
    },
    user: {
      fontSize: 12,
      marginRight: 5,
      paddingRight: 5,
      color: "#5a5a5a",
    },
    title: {
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 2.5,
      color: darkmode ? "white" : "black",
    },
    content: {
      fontSize: 14,
      color: darkmode ? "white" : "black",
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 5,
    },
    empty: {
      width: "100%",
      height: "100%",
      backgroundColor: darkmode ? "black" : "#f0f0f0",
      alignItems: "center",
      paddingTop: 150,
    },
    emptyText: {
      fontSize: 16,
      textAlign: "center",
      color: "gray",
      paddingTop: 10,
    },
  });
};
