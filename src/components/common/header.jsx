import { Image, TouchableOpacity, View } from "react-native";
import logo from "../../assets/domtory_icon.png";
import domtoryText from "../../assets/domtory_text.png";
import { AntDesign } from "@expo/vector-icons";
import NotiIcon from "./notiIcon";

export default function Header({ navigation }) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        width: "100%",
        height: 100,
        alignItems: "flex-end",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Image source={logo} style={{ width: 50, height: 50 }} />
        <Image source={domtoryText} style={{ width: 80, height: 30 }} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity>
            <NotiIcon navigation={navigation} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="search1"
              size={30}
              color="black"
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
