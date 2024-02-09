import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";

export default function Profile() {
  const { authState } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 100, height: 100 }} />
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
