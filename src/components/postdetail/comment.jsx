import React, { useState, useEffect, useCallback } from "react";
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
import like from "../../assets/like_icon.png";
import unlike from "../../assets/unlike_icon.png";
import { deleteComment, deleteReply, report, block, postCommentLike } from "../../server/board";
import { useAuth } from "../../store/AuthContext";
import Hyperlink from "react-native-hyperlink";
import ReplyCommentBox from "./replyComment";

export const handleReport = async (type, id) => {
  const result = await report(type, id);
  if (result.success) {
    Alert.alert("신고 완료", "해당 댓글 신고를 완료했습니다.");
  } else {
    console.error("신고 실패:", result.data);
    Alert.alert("오류", "신고에 실패했습니다. 다시 시도해주세요.");
  }
};

export default function CommentBox({ data, setCurrentReplyingTo, reloadData }) {
  const { authState } = useAuth();

  // 대댓글 작성 확인창
  const promptForReply = (commentId) => {
    Alert.alert(
      "대댓글 작성",
      "대댓글을 작성하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "예",
          onPress: () => {
            setCurrentReplyingTo(commentId);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // 댓글 삭제 확인창
  const confirmDelete = (commentId) => {
    Alert.alert(
      "댓글 삭제",
      "댓글을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "예",
          onPress: () => handleDelete(commentId),
        },
      ],
      { cancelable: false }
    );
  };

  // 댓글 삭제
  const handleDelete = async (commentId) => {
    const { success } = await deleteComment(commentId);
    if (success) {
      Alert.alert("댓글이 삭제되었습니다.");
      reloadData();
    } else {
      console.error("댓글 삭제에 실패했습니다:", result.data);
      Alert.alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

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

  // 좋아요 POST
  const [likesCounts, setLikesCounts] = useState({});
  const [isLiked, setIsLiked] = useState({});

  const handlePostLike = (comment) => async () => {
    if (comment.is_liked || isLiked[comment.id]) {
      Alert.alert('이미 좋아요 한 댓글입니다.');
    } else {
      Alert.alert(
        '좋아요',
        '이 댓글에 좋아요를 누르시겠습니까?',
        [
          {
            text: '아니요',
            onPress: () => console.log('좋아요 취소'),
            style: 'cancel',
          },
          {
            text: '네',
            onPress: async () => {
              try {
                const { success, data } = await postCommentLike(comment.id);
                if (success) {
                  setLikesCounts(prevCounts => ({
                    ...prevCounts,
                    [comment.id]: data.likes_cnt
                  }));
                  setIsLiked((prevIsLiked) => ({
                    ...prevIsLiked,
                    [comment.id]: true,
                  }));
                }
              } catch (error) {
                console.error("좋아요를 처리하는 중 에러 발생:", error);
              }
            },
          },
        ],
      );
    }
  };

  return (
    <>
      {data.comment &&
        data.comment.length > 0 &&
        data.comment.map((comment) =>
          comment.is_deleted && comment.reply.length === 0 ? null : (
            <View key={comment.id} style={styles.commentContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={domtory}
                    style={{
                      width: 23,
                      height: 23,
                      borderRadius: 3,
                      alignItems: "center",
                    }}
                  />
                  {/* 댓글의 상태 검사 후 필터링 */}
                  {comment.is_deleted ? (
                    <Text style={styles.commentMember}>삭제된 도토리</Text>
                  ) : comment.is_blocked ? (
                    <Text style={styles.commentMember}>유배당한 도토리</Text>
                  ) : comment.anonymous_number === 0 ? (
                    <Text style={styles.commentMember}>글쓴이 도토리</Text>
                  ) : (
                    <Text style={styles.commentMember}>
                      익명의 도토리{comment.anonymous_number}
                    </Text>
                  )}
                </View>
                {/* 옵션 버튼 (답글, 삭제, 신고, 좋아요) */}
                <View style={styles.commentOption}>
                  <Octicons
                    name="comment-discussion"
                    style={styles.commnetReply}
                    onPress={() => promptForReply(comment.id)}
                  />
                  <TouchableOpacity onPress={handlePostLike(comment)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={unlike} style={{ width: 15, height: 15, opacity: 0.45 }} />
                  </TouchableOpacity>
                  {parseInt(authState.id) === comment.member ? (
                    <TouchableOpacity onPress={() => confirmDelete(comment.id)}>
                      <Octicons name="trash" style={styles.commnetDelete} />
                    </TouchableOpacity>
                  ) : authState.staff === "YES" ? (
                    <>
                      <Octicons
                        name="stop"
                        style={styles.commnetReport}
                        onPress={() => confirmAndReport("comment", comment.id)}
                      />
                      <FontAwesome5
                        name="ban"
                        style={styles.commnetReport}
                        onPress={() => handleBlock(comment.id)}
                      />
                    </>
                  ) : (
                    <Octicons
                      name="stop"
                      style={styles.commnetReport}
                      onPress={() => confirmAndReport("comment", comment.id)}
                    />
                  )}
                </View>
              </View>
              {comment.is_deleted || comment.is_blocked ? (
                <Text style={styles.commentDeleted}>
                  {comment.is_deleted
                    ? "삭제된 댓글입니다."
                    : "해당 댓글은 신고되거나 관리자에 의해 숨김처리 되었습니다."}
                </Text>
              ) : (
                <>
                  {/* 내용, 날짜 등을 표시하는 부분 */}
                  <Hyperlink linkDefault={true} linkStyle={{ color: "mediumblue" }}>
                    <Text style={styles.commentContent}>{comment.body}</Text>
                  </Hyperlink>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.commentDate}>{comment.created_at}</Text>
                    <Image source={like} style={{ width: 15, height: 15 }} />
                    <Text style={styles.commentDate}>
                      {likesCounts[comment.id] !== undefined ? likesCounts[comment.id] : comment.likes_cnt}
                    </Text>
                  </View>
                </>
              )}
              {/* 대댓글 렌더링 부분 */}
              {comment.reply && comment.reply.length > 0 && (
                <View style={styles.replyContainer}>
                  <ReplyCommentBox
                    comment={comment}
                    reloadData={reloadData}
                    commentBlock={commentBlock}
                    handleBlock={handleBlock}
                    handleReport={handleReport}
                    handleReplyDelete={handleReplyDelete}
                    confirmAndReport={confirmAndReport}
                    confirmReplyDelete={confirmReplyDelete}
                  />
                </View>
              )}
            </View>
          )
        )}
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
    marginRight: 7
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
