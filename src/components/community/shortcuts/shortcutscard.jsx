import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ShortcutCard({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sortcutButton}
        onPress={() => navigation.navigate("자유게시판")}
      >
        <Octicons name="comment-discussion" size={24} color="black" />
        <Text style={styles.sortcutText}>자유게시판</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortcutButton}
        onPress={() => navigation.navigate("중고거래 게시판")}
      >
        <Entypo name="shop" size={24} color="black" />
        <Text style={styles.sortcutText}>중고거래 게시판</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortcutButton}
        onPress={() => navigation.navigate("취준생 게시판")}
      >
        <MaterialIcons name="work-outline" size={24} color="black" />
        <Text style={styles.sortcutText}>취준생 게시판</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortcutButton}
        onPress={() => navigation.navigate("번개모임 게시판")}
      >
        <AntDesign name="team" size={24} color="black" />
        <Text style={styles.sortcutText}>번개모임 게시판</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortcutButton}
        onPress={() => navigation.navigate("분실물 게시판")}
      >
        <MaterialCommunityIcons
          name="comment-question-outline"
          size={24}
          color="black"
        />
        <Text style={styles.sortcutText}>분실물 게시판</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  sortcutButton: {
    flexDirection: "row",
    paddingVertical: 15,
    gap: 20,
  },
  sortcutText: {
    fontSize: 20,
  },
});
