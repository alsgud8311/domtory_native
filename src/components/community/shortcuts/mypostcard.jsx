import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MyPostCard({ navigation }) {
  return (
    <View style={styles.container}>
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
    fontSize: 20,
  },
});
