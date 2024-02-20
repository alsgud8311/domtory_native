import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { deletePost, getPostDetail, report } from "../../server/board";
import NewPost from "./newPost";
import { useAuth } from "../../store/AuthContext";

const PopupMenu = ({ navigation }) => {
  const { authState } = useAuth();
  console.log(authState.id);
  const [data, setData] = useState({});
  const route = useRoute();
  const { postId, memberId } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [options, setOptions] = useState([]);

  const handleOpenNewPost = () => {
    setModalVisible(true);
  };

  const handleCloseNewPost = () => {
    setModalVisible(false);
  };

  const handleNewPostSubmit = () => {
    setRefreshFlag(!refreshFlag);
  };

  const handleDeleteButton = async (postId) => {
    try {
      const { success } = await deletePost(postId);
      if (success) {
        Alert.alert("삭제가 완료되었습니다.");
        navigation.pop();
      } else {
        Alert.alert("삭제 도중 오류가 발생했습니다.");
        navigation.pop();
      }
    } catch {
      Alert.alert("삭제 도중 오류가 발생했습니다.");
      navigation.pop();
    }
  };

  const handleReportPost = async (type, id) => {
    const result = await report(type, id);
    if (result.success) {
      Alert.alert("신고 완료", "해당 게시글 신고를 완료했습니다.");
      navigation.pop();
    } else {
      console.error("신고 실패:", result.data);
      Alert.alert("오류", "신고에 실패했습니다. 다시 시도해주세요.");
      navigation.pop();
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getPostDetail(postId);
  //       setData(result.data);
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [postId]);

  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (memberId && authState.id && memberId === parseInt(authState.id)) {
      setOptions([
        {
          title: "게시글 수정",
          action: () =>
            Alert.alert(
              "게시글 수정",
              "게시글을 수정하시겠습니까?",
              [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "예",
                  onPress: () => handleOpenNewPost(),
                },
              ],
              { cancelable: false } // Android에서 백 버튼을 눌렀을 때 대화 상자가 닫히지 않도록 설정
            ),
        },
        {
          title: "게시글 삭제",
          action: () =>
            Alert.alert(
              "게시글 삭제",
              "게시글을 삭제하시겠습니까?",
              [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "예",
                  onPress: () => handleDeleteButton(postId),
                },
              ],
              { cancelable: false }
            ),
        },
        //         {
        //   title: "게시글 신고",
        //   action: () =>
        //     Alert.alert(
        //       "게시글 신고",
        //       "게시글을 신고하시겠습니까?",
        //       [
        //         {
        //           text: "취소",
        //           style: "cancel",
        //         },
        //         {
        //           text: "예",
        //           onPress: () => handleReport("post", postId),
        //         },
        //       ],
        //       { cancelable: false }
        //     ),
        // },
      ]);
    } else {
      setOptions([
        {
          title: "게시글 신고",
          action: () =>
            Alert.alert(
              "게시글 신고",
              "게시글을 신고하시겠습니까?",
              [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "예",
                  onPress: () => handleReportPost("post", postId),
                },
              ],
              { cancelable: false }
            ),
        },
      ]);
    }
  }, [data, authState.id]);

  function resizeBox(to) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }
  return (
    <>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Animated.View style={[styles.popup, { transform: [{ scale }] }]}>
              {options.map((op, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    op.action();
                    setVisible(false);
                  }}
                  style={{
                    borderBottomWidth: i === options.length - 1 ? 0 : 1,
                    borderBottomColor: "#d9d9d9",
                    padding: 7,
                    paddingHorizontal: 15,
                  }}
                >
                  <Text style={styles.title}>{op.title}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <NewPost
        isVisible={isModalVisible}
        onClose={handleCloseNewPost}
        onPostSubmit={handleNewPostSubmit}
        post={data}
      />
    </>
  );
};

const styles = StyleSheet.create({
  popup: {
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    position: "absolute",
    top: 45,
    right: 20,
    // iOS용 그림자 스타일
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android용 그림자 스타일
    elevation: 5,
  },
  title: {
    fontSize: 17,
  },
});

export default PopupMenu;
