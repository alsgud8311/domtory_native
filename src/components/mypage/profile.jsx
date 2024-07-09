import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";
import { useColorStore } from "../../store/colorstore";
import { useMemo } from "react";

export default function Profile() {
  const { authState } = useAuth();
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 120, height: 120 }} />
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={styles.userName}>{authState.name.substr(1)}</Text>
          {authState.staff === "YES" ? (
            <Text style={styles.userStatus}>자율회 도토리</Text>
          ) : (
            <Text style={styles.userStatus}>도토리</Text>
          )}
        </View>
        <Text style={styles.userNum}>{authState.username}</Text>
      </View>
    </View>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      backgroundColor: darkmode ? "black" : "white",
    },
    userStatus: {
      fontSize: 18,
      color: darkmode ? "white" : "black",
    },
    userNum: {
      fontSize: 17,
      color: "gray",
    },
    userName: {
      fontSize: 30,
      color: darkmode ? "white" : "black",
    },
  });
};
