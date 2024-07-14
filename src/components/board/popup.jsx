import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { block, deletePost, report } from "../../server/board";
import { createMessage } from "../../server/message";
import { useAuth } from "../../store/AuthContext";
import { useColorStore } from "../../store/colorstore";

const PopupMenu = ({ navigation }) => {
  const { authState } = useAuth();
  const route = useRoute();
  const { postId, memberId } = route.params;
  const [options, setOptions] = useState([]);
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
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

  const handleBlockPost = async (postId) => {
    const { success } = await block(postId, "post");
    if (success) {
      Alert.alert("차단 완료", "해당 게시물을 숨김처리했습니다.");
      navigation.pop();
    } else {
      console.error("차단 실패:", result.data);
      Alert.alert("차단 오류", "차단에 실패했습니다. 다시 시도해주세요.");
      navigation.pop();
    }
  };

  const handleCreateMessage = async (postId) => {
    try {
      const response = await createMessage(postId, 0);
      if (response.success) {
        console.log("쪽지방 생성 성공", response.data);
        navigation.navigate("쪽지방", {
          messageId: response.data.message_room_id,
        });
      } else {
        console.error("쪽지방 생성 실패:", response.data);
      }
    } catch (error) {
      console.error("쪽지방 생성 오류:", error);
    }
  };

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
                  onPress: () =>
                    navigation.navigate("게시글 수정", { postId: postId }),
                },
              ],
              { cancelable: false }
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
      ]);
    } else if (authState.staff === "YES") {
      setOptions([
        {
          title: "게시글 신고",
          action: () =>
            Alert.alert(
              "게시글 신고",
              "게시글을 신고하시겠습니까?\n신고된 게시글은 1차적으로 판별 시스템에 의해 삭제조치되며, 삭제 조치가 이루어지지 않은 게시글은 자율회에서 검토 후 삭제되거나 커뮤니티 이용 규칙에 위반되지 않는다고 판단할 시 보존됩니다.",
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
        {
          title: "게시물 차단",
          action: () =>
            Alert.alert(
              "게시물 차단",
              "해당 게시물을 차단하시겠습니까?\n차단된 게시물은 유저들이 더 이상 볼 수 없습니다.",
              [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "예",
                  onPress: () => handleBlockPost(postId),
                },
              ],
              { cancelable: false }
            ),
        },
      ]);
    } else {
      setOptions([
        {
          title: "게시글 신고",
          action: () =>
            Alert.alert(
              "게시글 신고",
              "게시글을 신고하시겠습니까?\n신고된 게시글은 1차적으로 판별 시스템에 의해 삭제조치되며, 삭제 조치가 이루어지지 않은 게시글은 자율회에서 검토 후 삭제되거나 커뮤니티 이용 규칙에 위반되지 않는다고 판단할 시 보존됩니다.",
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
        {
          title: "쪽지 보내기",
          action: () =>
            Alert.alert(
              "쪽지 보내기",
              "해당 게시물을 작성한 상대방에게 쪽지를 보내시겠습니까?",
              [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "예",
                  onPress: () => handleCreateMessage(postId),
                },
              ],
              { cancelable: false }
            ),
        },
      ]);
    }
  }, [authState.id]);

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
        <Entypo
          name="dots-three-vertical"
          size={20}
          color={darkmode ? "white" : "black"}
        />
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
    </>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const createStyles = (darkmode) => {
  return StyleSheet.create({
    popup: {
      borderRadius: 5,
      borderColor: "#fff",
      borderWidth: 1,
      backgroundColor: darkmode ? "black" : "#fff",
      paddingHorizontal: 5,
      position: "absolute",
      top: windowHeight * 0.055,
      right: windowWidth * 0.03,
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
      color: darkmode ? "white" : "black",
    },
  });
};

export default PopupMenu;
