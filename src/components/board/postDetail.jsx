import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
  Button,
  RefreshControl,
  Keyboard,
} from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";
import domtory from "../../assets/icon.png";
import {
  postComment,
  deleteComment,
  postReply,
  deleteReply,
  updatePost,
  report,
} from "../../server/board";
import { useAuth } from "../../store/AuthContext";
import ImageModal from "react-native-image-modal";

export const handleReport = async (type, id) => {
  const result = await report(type, id);
  if (result.success) {
    Alert.alert("신고 완료", "해당 댓글 신고를 완료했습니다.");
  } else {
    console.error("신고 실패:", result.data);
    Alert.alert("오류", "신고에 실패했습니다. 다시 시도해주세요.");
  }
};

export default function PostDetail({ data, reloadData, postId }) {
  const { authState } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reloadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const [imageHeights, setImageHeights] = useState([]);
  const screenWidth = Dimensions.get("window").width - 40;
  useEffect(() => {
    if (data && data.post_image) {
      const heights = data.post_image.map(() => 0);
      data.post_image.forEach((img, index) => {
        if (!img.is_deleted) {
          Image.getSize(img.image_url, (width, height) => {
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;
            heights[index] = imageHeight;
            setImageHeights([...heights]);
          });
        }
      });
    }
  }, [data]);

  // 댓글
  const [comment, setComment] = useState("");
  const [currentReplyingTo, setCurrentReplyingTo] = useState(null);

  const onChangeComment = (inputComment) => {
    setComment(inputComment);
  };

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

  // 댓글 POST
  const handleCommentSubmit = async () => {
    const { success } = await postComment(postId, comment);
    if (success) {
      Alert.alert("댓글이 작성되었습니다.");
      setComment("");
      reloadData();
    } else {
      console.error("댓글 작성에 실패했습니다:", result.data);
      Alert.alert("오류", "댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 대댓글 POST
  const handleReplySubmit = async () => {
    if (!currentReplyingTo) return;

    const { success } = await postReply(currentReplyingTo, comment);
    if (success) {
      Alert.alert("댓글이 작성되었습니다.");
      setComment("");
      setCurrentReplyingTo(null);
      reloadData();
    } else {
      console.error("대댓글 작성에 실패했습니다:", result.data);
      Alert.alert("오류", "대댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
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
      "신고",
      "이 게시글/댓글을 신고하시겠습니까?",
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 글내용 */}
        <View style={styles.header}>
          <Image
            source={domtory}
            style={{ width: 45, height: 45, borderRadius: 10 }}
          />
          <View style={{ flexDirection: "column", marginLeft: 8 }}>
            <Text style={styles.user}>익명의 도토리</Text>
            <Text style={styles.date}>{data.created_at}</Text>
          </View>
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.content}>{data.body}</Text>
        {/* 사진 */}
        {data &&
          data.post_image &&
          data.post_image.map((img, index) => {
            if (!img.is_deleted) {
              return (
                <ImageModal
                  resizeMode="contain"
                  key={img.id}
                  source={{ uri: img.image_url }}
                  style={{
                    width: screenWidth,
                    height: imageHeights[index],
                    resizeMode: "contain",
                    borderRadius: 3,
                    marginBottom: 10,
                  }}
                />
              );
            }
          })}
        <View style={styles.comment}>
          <Octicons name="comment" style={styles.commentIcon} />
          <Text style={styles.commentNum}>{data.comment_cnt}</Text>
        </View>
        {/* /댓글 */}
        {data.comment &&
          data.comment.length > 0 &&
          data.comment.map((comment) =>
            comment.is_deleted && comment.reply.length === 0 ? null : (
              <View key={comment.id} style={styles.commentContainer}>
                {/* 댓글 본문 (삭제 여부 확인) */}
                {comment.is_deleted ? (
                  <>
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
                      <Text style={styles.commentMember}>삭제된 도토리</Text>
                    </View>
                    <Text style={styles.commentDeleted}>
                      삭제된 댓글입니다.
                    </Text>
                  </>
                ) : comment.is_blocked ? (
                  <>
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
                      <Text style={styles.commentMember}>신고당한 도토리</Text>
                    </View>
                    <Text style={styles.commentDeleted}>
                      신고당한 댓글입니다.
                    </Text>
                  </>
                ) : (
                  <>
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
                          }}
                        />
                        <Text style={styles.commentMember}>익명의 도토리</Text>
                      </View>
                      <View style={styles.commentOption}>
                        <Octicons
                          name="comment-discussion"
                          style={styles.commnetReply}
                          onPress={() => promptForReply(comment.id)}
                        />
                        {parseInt(authState.id) === comment.member ? (
                          <TouchableOpacity
                            onPress={() => confirmDelete(comment.id)}
                          >
                            <Octicons
                              name="trash"
                              style={styles.commnetDelete}
                            />
                          </TouchableOpacity>
                        ) : (
                          <Octicons
                            name="stop"
                            style={styles.commnetReport}
                            onPress={() =>
                              confirmAndReport("comment", comment.id)
                            }
                          />
                        )}
                      </View>
                    </View>

                    <Text style={styles.commentContent}>{comment.body}</Text>
                    <Text style={styles.commentDate}>{comment.created_at}</Text>
                  </>
                )}
                {/* 대댓글 렌더링 부분 */}
                {comment.reply && comment.reply.length > 0 && (
                  <View style={styles.replyContainer}>
                    {comment.reply.map((reply, index) =>
                      reply.is_deleted ? (
                        <View style={styles.reply}>
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={domtory}
                              style={{ width: 23, height: 23, borderRadius: 3 }}
                            />
                            <Text style={styles.commentMember}>
                              삭제된 도토리
                            </Text>
                          </View>

                          <Text key={reply.id} style={styles.commentDeleted}>
                            삭제된 댓글입니다.
                          </Text>
                        </View>
                      ) : reply.is_blocked ? (
                        <View style={styles.reply}>
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={domtory}
                              style={{ width: 23, height: 23, borderRadius: 3 }}
                            />
                            <Text style={styles.commentMember}>
                              신고당한 도토리
                            </Text>
                          </View>

                          <Text key={reply.id} style={styles.commentDeleted}>
                            신고당한 대댓글입니다.
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.reply}>
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
                                }}
                              />
                              <Text style={styles.commentMember}>
                                익명의 도토리
                              </Text>
                            </View>
                            <View style={styles.commentOption}>
                              {parseInt(authState.id) === reply.member ? (
                                <Octicons
                                  name="trash"
                                  style={styles.commnetDelete}
                                  onPress={() => confirmReplyDelete(reply.id)}
                                />
                              ) : (
                                <Octicons
                                  name="stop"
                                  style={styles.commnetReport}
                                  onPress={() =>
                                    confirmAndReport("comment", reply.id)
                                  }
                                />
                              )}
                            </View>
                          </View>
                          <Text style={styles.commentContent}>
                            {reply.body}
                          </Text>
                          <Text style={styles.commentDate}>
                            {reply.created_at}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                )}
              </View>
            )
          )}
      </ScrollView>
      {/* 댓글 작성 */}
      <KeyboardAvoidingView
        style={styles.writeComment}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -500} // iOS 외 플랫폼에서는 원하는 값으로 설정
      >
        {/* <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        > */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder={
              currentReplyingTo ? "대댓글을 입력하세요" : "댓글을 입력하세요"
            }
            placeholderTextColor={"#848484"}
            multiline={true}
            scrollEnabled={true}
            onChangeText={onChangeComment}
            value={comment}
            style={styles.commentInput}
          />
          {/* 작성 버튼 */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              currentReplyingTo ? handleReplySubmit : handleCommentSubmit
            }
          >
            <Feather name="edit-3" size={23} color="#ffa451" />
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 5,
    flex: 1,
  },
  // 내용
  header: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  user: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "grey",
  },
  image: {
    borderRadius: 3,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  content: {
    fontSize: 15,
    marginBottom: 13,
  },

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
    borderRightWidth: 1,
    borderRightColor: "#6666665e",
  },
  // 댓글 삭제 아이콘
  commnetDelete: {
    fontSize: 14,
    color: "#66666675",
    paddingHorizontal: 13,
    borderRightWidth: 1,
    borderRightColor: "#6666665e",
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
