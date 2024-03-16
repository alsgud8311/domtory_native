import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import domtory from "../../assets/icon.png";
import { deleteComment, deleteReply, report, block } from "../../server/board";
import { useAuth } from "../../store/AuthContext";
import Hyperlink from "react-native-hyperlink";

export const handleReport = async (type, id) => {
  const result = await report(type, id);
  if (result.success) {
    Alert.alert("신고 완료", "해당 댓글 신고를 완료했습니다.");
  } else {
    console.error("신고 실패:", result.data);
    Alert.alert("오류", "신고에 실패했습니다. 다시 시도해주세요.");
  }
};

export default function ReplyCommentBox({ comment, reloadData }) {
  const { authState } = useAuth();

  // 대댓글 삭제 확인창
  const confirmReplyDelete = (commentId) => {
    Alert.alert(
      "대댓글 삭제",
      "대댓글을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "예",
          onPress: () => handleReplyDelete(commentId),
        },
      ],
      { cancelable: false }
    );
  };

  // 대댓글 삭제
  const handleReplyDelete = async (commentId) => {
    const { success } = await deleteReply(commentId);
    if (success) {
      Alert.alert("대댓글이 삭제되었습니다.");
      reloadData();
    } else {
      console.error("대댓글 삭제에 실패했습니다:", result.data);
      Alert.alert("대댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 신고 확인 및 처리
  const confirmAndReport = (type, id) => {
    Alert.alert(
      "댓글 신고",
      "해당 댓글을 신고하시겠습니까?\n신고된 게시글은 1차적으로 판별 시스템에 의해 삭제조치되며, 삭제 조치가 이루어지지 않은 게시글은 자율회에서 검토 후 삭제되거나 커뮤니티 이용 규칙에 위반되지 않는다고 판단할 시 보존됩니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "예",
          onPress: () => handleReport(type, id),
        },
      ],
      { cancelable: false }
    );
  };

  // 신고
  const handleReport = async (type, id) => {
    const result = await report(type, id);
    if (result.success) {
      Alert.alert("신고 완료", "해당 게시글/댓글 신고를 완료했습니다.");
    } else {
      console.error("신고 실패:", result.data);
      Alert.alert("오류", "신고에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 댓글차단
  const handleBlock = (commentId) => {
    Alert.alert(
      "댓글/대댓글 차단",
      "해당 댓글/대댓글을 차단하시겠습니까? 차단하면 해당 댓글은 모두에게 보이지 않습니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "예",
          onPress: () => commentBlock(commentId),
        },
      ],
      { cancelable: false }
    );
  };

  //댓글 차단 -> 댓글 차단 후 reload
  const commentBlock = async (commentId) => {
    const { success } = await block(commentId, "comment");
    if (success) {
      Alert.alert("대댓글이 차단 및 숨김처리 되었습니다.");
      reloadData();
    } else {
      console.error("대댓글 차단에 실패했습니다:", result.data);
      Alert.alert("댓글/대댓글 차단에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      {/* 대댓글 렌더링 부분 */}
      {comment.reply.map((reply, index) => (
        <View style={styles.reply} key={index}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={domtory}
              style={{ width: 23, height: 23, borderRadius: 3 }}
            />
            <Text style={styles.commentMember}>
              {reply.is_deleted ? "삭제된 도토리" : "유배당한 도토리"}
            </Text>
          </View>
          {reply.is_deleted || reply.is_blocked ? (
            <Text style={styles.commentDeleted}>
              {reply.is_deleted
                ? "삭제된 댓글입니다."
                : "해당 댓글은 신고에 의해 숨김처리되거나 차단조치된 댓글입니다."}
            </Text>
          ) : (
            <>
              {/* 대댓글 내용, 날짜 등을 표시하는 부분 */}
              <Hyperlink linkDefault={true} linkStyle={{ color: "mediumblue" }}>
                <Text style={styles.commentContent}>{reply.body}</Text>
              </Hyperlink>
              <Text style={styles.commentDate}>{reply.created_at}</Text>
              {/* 대댓글의 옵션 버튼 (삭제, 신고 등) */}
              <View style={styles.commentOption}>
                {parseInt(authState.id) === reply.member ? (
                  <Octicons
                    name="trash"
                    style={styles.commnetDelete}
                    onPress={() => confirmReplyDelete(reply.id)}
                  />
                ) : (
                  <>
                    <Octicons
                      name="stop"
                      style={styles.commnetReport}
                      onPress={() => confirmAndReport("comment", reply.id)}
                    />
                    <FontAwesome5
                      name="ban"
                      style={styles.commnetReport}
                      onPress={() => handleBlock(reply.id)}
                    />
                  </>
                )}
              </View>
            </>
          )}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  // 댓글 아이콘, 댓글수
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    marginBottom: 13,
    marginTop: 15,
  },
  commentIcon: {
    fontSize: 17,
    marginRight: 5,
    color: "#666666",
  },
  commentNum: {
    fontSize: 15,
    color: "#666666",
  },
  // 댓글 컨테이너
  commentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    paddingBottom: 8,
    marginBottom: 8,
  },
  // 댓글 작성자
  commentMember: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 5,
  },
  // 댓글 내용
  commentContent: {
    fontSize: 15,
    color: "#333",
    marginTop: 3,
    marginBottom: 4,
  },
  // 댓글 작성일
  commentDate: {
    fontSize: 13,
    color: "#666666",
  },
  // 댓글 옵션
  commentOption: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 10,
    backgroundColor: "#e1e1e170",
  },
  // 대댓글 아이콘
  commnetReply: {
    fontSize: 14,
    color: "#66666675",
    paddingHorizontal: 13,
  },
  // 댓글 삭제 아이콘
  commnetDelete: {
    fontSize: 14,
    color: "#66666675",
    paddingHorizontal: 13,
  },
  // 댓글 신고 아이콘
  commnetReport: {
    fontSize: 13,
    color: "#66666675",
    paddingHorizontal: 15,
  },
  // 삭제된 댓글
  commentDeleted: {
    paddingVertical: 13,
    color: "#666666",
  },
  // 대댓글 컨테이너
  replyContainer: {
    marginTop: 8,
    paddingHorizontal: 2,
  },
  // 대댓글 1개 컨테이너
  reply: {
    backgroundColor: "#e1e1e170",
    marginBottom: 10,
    borderRadius: 10,
    padding: 6,
  },

  // 댓글 작성
  writeComment: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    marginBottom: 70,
  },
  inputBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    backgroundColor: "#d8d8d853",
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  commentInput: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    paddingHorizontal: 10,
    paddingBottom: 1.5,
    minHeight: 45,
    fontSize: 14,
  },
  anonymousCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: "#848484",
    marginBottom: 3,
    marginLeft: 4,
  },
  submitButton: {
    marginRight: 3,
  },
});
