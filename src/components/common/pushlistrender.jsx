import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { pushCheckUpdate, pushDelete } from "../../server/notifications";

export const pushRenderItems = ({ item, navigation }) => {
  const board = {
    1: "자유 게시판",
    2: "중고거래게시판",
    3: "취준생게시판",
    4: "번개모임게시판",
    5: "분실물게시판",
  };
  const navigateToDetailScreen = async () => {
    if (item.boardId && item.postId) {
      const { success } = await pushCheckUpdate(item.memberId, item.pushedAt);
      if (success) {
        navigation.navigate(board[item.boardId], {
          postId: item.postId,
          memberId: item.member,
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
      style={{ flex: 1, backgroundColor: "white" }}
      onPress={navigateToDetailScreen}
    >
      <View
        style={[
          styles.item,
          item.isChecked
            ? { backgroundColor: "white" }
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
    padding: 15,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EAEAEA",
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
    paddingTop: 10,
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
});
