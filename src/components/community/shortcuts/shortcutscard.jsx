import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import dotory from "../../../assets/unlike_icon.png";
import { useColorStore } from "../../../store/colorstore";
import { useMemo } from "react";

export default function ShortcutCard({ navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode));
  return (
    <>
      <View style={styles.noticeContainer}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.boardTitle}>자율회 및 학사 공지사항</Text>
          {/* <Text style={styles.boardsubTitle}>
            자율회와 학사의 공지사항을 전해드려요
          </Text> */}
        </View>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("공지사항", { div: "cbhs" })}
        >
          <AntDesign name="notification" style={styles.icons} />
          <Text style={styles.shortcutText}>공지사항</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.boardTitle}>커뮤니티</Text>
          {/* <Text style={styles.boardsubTitle}>
            같은 학사생들과 이런저런 이야기를 나눌 수 있어요
          </Text> */}
        </View>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("핫도토리 게시판")}
        >
          <Image
            source={dotory}
            style={{
              width: 25,
              height: 25,
              tintColor: darkmode ? "white" : "black",
            }}
          />
          <Text style={styles.shortcutText}>핫도토리 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("통합게시판")}
        >
          <FontAwesome6 name="people-roof" style={styles.icons} />
          <Text style={styles.shortcutText}>통합게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("자유게시판")}
        >
          <Octicons name="comment-discussion" style={styles.icons} />
          <Text style={styles.shortcutText}>자유게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("중고거래 게시판")}
        >
          <Entypo name="shop" style={styles.icons} />
          <Text style={styles.shortcutText}>중고거래 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("취준생 게시판")}
        >
          <MaterialIcons name="work-outline" style={styles.icons} />
          <Text style={styles.shortcutText}>취준생 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("번개모임 게시판")}
        >
          <AntDesign name="team" style={styles.icons} />
          <Text style={styles.shortcutText}>번개모임 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shortcutButton}
          onPress={() => navigation.navigate("분실물 게시판")}
        >
          <MaterialCommunityIcons
            name="comment-question-outline"
            style={styles.icons}
          />
          <Text style={styles.shortcutText}>분실물 게시판</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    noticeContainer: {
      width: "100%",
      padding: 20,
      borderTopColor: "gray",
      borderTopWidth: 1,
    },
    container: {
      width: "100%",
      padding: 20,
      borderTopColor: "gray",
      borderTopWidth: 1,
      paddingBottom: 110,
    },
    icons: {
      color: darkmode ? "white" : "black",
      fontSize: 24,
    },
    shortcutButton: {
      flexDirection: "row",
      paddingVertical: 15,
      gap: 20,
      color: darkmode ? "#fff" : "black",
    },
    shortcutText: {
      fontSize: 17,
      color: darkmode ? "white" : "black",
    },
    boardTitle: {
      fontSize: 16,
      marginBottom: 5,
      fontWeight: "700",
      color: "orange",
    },
    boardsubTitle: {
      color: "orange",
      fontSize: 14,
    },
  });
};
