import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import logo from "../../assets/domtory_icon.png";
import domtoryText from "../../assets/domtory_text.png";
import domtoryText_darkmode from "../../assets/domtory_text_darkmode.png";
import { AntDesign } from "@expo/vector-icons";
import NotiIcon from "./notiIcon";
import { useColorStore } from "../../store/colorstore";
import { useMemo } from "react";

export default function Header({ navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={logo}
          style={{ width: 50, height: 50, marginLeft: 10 }}
        />
        <Image
          source={darkmode ? domtoryText_darkmode : domtoryText}
          style={{ width: 80, height: 30 }}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <NotiIcon navigation={navigation} />
          <TouchableOpacity>
            <AntDesign
              name="search1"
              size={30}
              color={darkmode ? "gray" : "black"}
              onPress={() =>
                navigation.navigate("전체검색", { board: "전체 게시판" })
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      justifyContent: "space-between",
      width: "100%",
      height: 100,
      alignItems: "flex-end",
      flexDirection: "row",
      backgroundColor: darkmode ? "black" : "#fff",
    },
  });
};
