import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function MypageCard() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="alternate-email" size={24} color="black" />
          <Text style={styles.cardText}>이메일</Text>
          <Text style={{ color: "gray" }}>alsgud8311@naver.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <AntDesign name="lock" size={24} color="black" />
          <Text style={styles.cardText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.card}>
          <AntDesign name="unlock" size={24} color="black" />
          <Text style={styles.cardText}>로그아웃</Text>
          <Text style={{ color: "gray" }}>alsgud8311@naver.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="sad-tear" size={24} color="black" />
          <Text style={styles.cardText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  wrapper: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "gray",
    borderTopColor: "gray",
  },
  card: {
    padding: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
  },
});
