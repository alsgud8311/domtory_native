import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="black" />
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 30 }}>닉네임</Text>
        <Text style={{ fontSize: 17, color: "gray" }}>
          alsgud8311@naver.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
