import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import dotory from "../../../assets/unlike_icon.png";
export default function ShortcutCard({ navigation }) {
    return (<>
      <View style={styles.noticeContainer}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.boardTitle}>자율회 및 학사 공지사항</Text>
          {/* <Text style={styles.boardsubTitle}>
          자율회와 학사의 공지사항을 전해드려요
        </Text> */}
        </View>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("공지사항", { div: "cbhs" })}>
          <AntDesign name="notification" size={24} color="black"/>
          <Text style={styles.sortcutText}>공지사항</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.boardTitle}>커뮤니티</Text>
          {/* <Text style={styles.boardsubTitle}>
          같은 학사생들과 이런저런 이야기를 나눌 수 있어요
        </Text> */}
        </View>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("핫도토리 게시판")}>
          <Image source={dotory} style={{ width: 25, height: 25 }}/>
          <Text style={styles.sortcutText}>핫도토리 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("자유게시판")}>
          <Octicons name="comment-discussion" size={24} color="black"/>
          <Text style={styles.sortcutText}>자유게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("중고거래 게시판")}>
          <Entypo name="shop" size={24} color="black"/>
          <Text style={styles.sortcutText}>중고거래 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("취준생 게시판")}>
          <MaterialIcons name="work-outline" size={24} color="black"/>
          <Text style={styles.sortcutText}>취준생 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("번개모임 게시판")}>
          <AntDesign name="team" size={24} color="black"/>
          <Text style={styles.sortcutText}>번개모임 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortcutButton} onPress={() => navigation.navigate("분실물 게시판")}>
          <MaterialCommunityIcons name="comment-question-outline" size={24} color="black"/>
          <Text style={styles.sortcutText}>분실물 게시판</Text>
        </TouchableOpacity>
      </View>
    </>);
}
const styles = StyleSheet.create({
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
    sortcutButton: {
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
        fontWeight: "700",
        color: "orange",
    },
    boardsubTitle: {
        color: "orange",
        fontSize: 14,
    },
});
