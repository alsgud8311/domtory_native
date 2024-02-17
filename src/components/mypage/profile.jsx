import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";

export default function Profile() {
  const { authState } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 120, height: 120 }} />
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>{authState.name.substr(1)}</Text>
          <Text style={{ fontSize: 18 }}>도토리</Text>
        </View>
        <Text style={{ fontSize: 17, color: "gray" }}>
          {authState.username}
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
    justifyContent: "center",
    gap: 40,
  },
});
