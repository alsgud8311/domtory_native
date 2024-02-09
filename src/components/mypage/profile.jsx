import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../store/AuthContext";

export default function Profile() {
  const { authState } = useAuth();

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="black" />
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 30 }}>{authState.member.nickname}</Text>
        <Text style={{ fontSize: 17, color: "gray" }}>
          {authState.member.email}
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
