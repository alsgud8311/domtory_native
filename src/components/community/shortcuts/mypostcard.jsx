import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MyPostCard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 5 }}>
        <Text style={styles.boardTitle}>내 정보 관리</Text>
        {/* <Text style={styles.boardsubTitle}>
          내가 쓴 댓글과 글을 확인할 수 있어요
        </Text> */}
      </View>
      <TouchableOpacity
        style={styles.shortcutButton}
        onPress={() => navigation.navigate("내가 쓴 글")}
      >
        <MaterialCommunityIcons
          name="comment-account-outline"
          size={24}
          color="black"
        />
        <Text style={styles.sortcutText}>내가 쓴 글</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shortcutButton}
        onPress={() => navigation.navigate("내가 쓴 댓글")}
      >
        <FontAwesome5 name="comment-dots" size={24} color="black" />
        <Text style={styles.sortcutText}>내가 쓴 댓글</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  shortcutButton: {
    flexDirection: "row",
    paddingVertical: 15,
    gap: 20,
  },
  sortcutText: {
    fontSize: 17,
  },
  boardTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: "orange",
    fontWeight: "700",
  },
  boardsubTitle: {
    fontSize: 14,
    color: "orange",
  },
});
