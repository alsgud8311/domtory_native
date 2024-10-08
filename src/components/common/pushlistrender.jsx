import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { pushCheckUpdate, pushDelete } from "../../server/notifications";
import { useColorStore } from "../../store/colorstore";

export const pushRenderItems = ({ item, navigation, darkmode }) => {
  const board = {
    1: "자유 게시판",
    2: "중고거래게시판",
    3: "취준생게시판",
    4: "번개모임게시판",
    5: "분실물게시판",
    6: "자율회 공지사항",
    7: "통합 게시판",
  };
  const styles = createStyles(darkmode);
  const navigateToDetailScreen = async () => {
    if ((item.boardId && item.postId) || item.messageRoomId) {
      console.log(item.messageRoomId);
      const { success } = await pushCheckUpdate(item.memberId, item.pushedAt);
      if (item.postId) {
        navigation.navigate(board[item.boardId], {
          postId: item.postId,
          memberId: item.member,
        });
      } else if (item.messageRoomId) {
        navigation.navigate("쪽지방", {
          messageId: item.messageRoomId,
        });
      }
    } else {
      const { success } = await pushCheckUpdate(item.memberId, item.pushedAt);
      if (success) {
        navigation.pop();
      }
    }
  };

  return (
    <TouchableOpacity
      key={item.index}
      style={{ flex: 1, backgroundColor: darkmode ? "black" : "white" }}
      onPress={navigateToDetailScreen}
    >
      <View
        style={[
          styles.item,
          item.isChecked
            ? darkmode
              ? { backgroundColor: "black" }
              : { backgroundColor: "white" }
            : darkmode
            ? { backgroundColor: "gray" }
            : { backgroundColor: "#FFCB99" },
        ]}
      >
        {/* 제목, 내용 */}
        <View style={{ width: "80%" }}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.content} ellipsizeMode="tail" numberOfLines={2}>
            {item.body}
          </Text>

          {/* 유저, 작성일 */}
          <View style={{ flexDirection: "row", marginTop: 7, height: 15 }}>
            <Text style={styles.date}>{item.transformedPushedAt}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "white",
      flex: 1,
      paddingBottom: 65,
    },
    // 글 박스
    item: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "#ffffff",
      padding: 15,
      paddingBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: darkmode ? "gray" : "#EAEAEA",
    },
    date: {
      fontSize: 11,
      color: darkmode ? "lightgray" : "#5a5a5a",
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
      color: darkmode ? "white" : "black",
    },
    content: {
      paddingTop: 10,
      paddingRight: 10,
      fontSize: 13,
      marginBottom: 2,
      color: darkmode ? "white" : "black",
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
};
