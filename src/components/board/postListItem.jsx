import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import acorn from "../../assets/like_icon.png";
import { useColorStore } from "../../store/colorstore";
import { useMemo } from "react";

export default function PostListItems({ item, navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
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
      case 7:
        screenName = "통합 게시판";
        break;
      default:
        screenName = "일치하는 게시판 없음";
    }

    if (screenName !== "일치하는 게시판 없음") {
      navigation.navigate(screenName, {
        postId: item.id,
        memberId: item.member,
      });
    }
  };

  return (
    <TouchableOpacity onPress={navigateToDetailScreen} key={item.id}>
      <View style={styles.item}>
        {/* 제목, 내용 */}
        <View style={{ width: "80%" }}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.content} ellipsizeMode="tail" numberOfLines={2}>
            {item.body}
          </Text>

          {/* 유저, 작성일 */}
          <View style={styles.commentWrapper}>
            <Text style={styles.date}>{item.created_at}</Text>
            <View style={styles.likedCntWrapper}>
              <Image source={acorn} style={{ width: 15, height: 15 }}></Image>
              <Text style={styles.likedCnt}>{item.likes_cnt}</Text>
            </View>
            <View style={styles.comment}>
              <Octicons name="comment" style={styles.commentIcon} />
              <Text style={styles.comment_cnt}>{item.comment_cnt}</Text>
            </View>
          </View>
        </View>
        {/* 사진 */}
        {item.thumbnail_url && (
          <View style={styles.thumbnailWrapper}>
            <Image source={{ uri: item.thumbnail_url }} style={styles.image} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "white",
      flex: 1,
      marginBottom: 65,
    },
    // 글 박스
    item: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "white",
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
      borderTopWidth: 1,
      borderColor: darkmode ? "gray" : "white",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    date: {
      fontSize: 11,
      color: darkmode ? "lightgray" : "gray",
    },
    commentWrapper: {
      flexDirection: "row",
      marginTop: 7,
      height: 15,
      gap: 10,
    },
    commentIcon: {
      fontSize: 13,
      marginRight: 5,
      color: darkmode ? "#ff4d6d" : "crimson",
    },
    comment_cnt: {
      fontSize: 12,
      color: darkmode ? "#ff4d6d" : "crimson",
    },
    title: {
      color: darkmode ? "white" : "black",
      fontSize: 14,
      paddingRight: 10,
      fontWeight: "700",
      marginBottom: 2.5,
    },
    content: {
      color: darkmode ? "white" : "black",
      paddingRight: 10,
      fontSize: 13,
      marginBottom: 2,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 5,
    },
    thumbnailWrapper: {
      alignItems: "center",
      justifyContent: "center",
      paddingRight: 10,
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
    likedCntWrapper: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    likedCnt: {
      fontSize: 12,
      color: darkmode ? "white" : "black",
    },
    comment: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
