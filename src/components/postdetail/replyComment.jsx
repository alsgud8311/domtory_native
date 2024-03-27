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

export default function ReplyCommentBox({
  comment,
  reloadData,
  commentBlock,
  handleBlock,
  handleReport,
  handleReplyDelete,
  confirmAndReport,
  confirmReplyDelete,
}) {
  const { authState } = useAuth();

  // 좋아요 POST
  const [likesCount, setLikesCount] = useState(null);

  const handlePostLike = (commentId) => async () => {
    try {
      const { success, data } = await postCommentLike(commentId);
      if (success) {
        setLikesCount(data.likes_cnt);
      }
    } catch (error) {
      console.error("좋아요를 처리하는 중 에러 발생:", error);
    }
  };

  return (
    <>
      {/* 대댓글 렌더링 부분 */}
      {comment.reply.map((reply, index) => (
        <View style={styles.reply} key={index}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={domtory}
                style={{ width: 23, height: 23, borderRadius: 3 }}
              />
              <Text style={styles.commentMember}>
                {reply.is_deleted
                  ? "삭제된 도토리"
                  : reply.is_blocked
                    ? "유배당한 도토리"
                    : reply.anonymous_number === 0
                      ? "글쓴이 도토리"
                      : `익명의 도토리 ${reply.anonymous_number}`}
              </Text>
            </View>
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
              <TouchableOpacity onPress={handlePostLike(reply.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={unlike} style={{ width: 15, height: 15 }} />
              </TouchableOpacity>
            </View>
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
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={styles.commentDate}>{reply.created_at}</Text>
                <Image source={like} style={{ width: 15, height: 15 }} />
                <Text>
                  {likesCount === null ? reply.likes_cnt : likesCount}
                </Text>
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
