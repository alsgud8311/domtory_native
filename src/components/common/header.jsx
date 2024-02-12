import { Image, TouchableOpacity, View } from "react-native";
import logo from "../../assets/adaptive-icon.png";
import domtoryText from "../../assets/domtory_text.png";
import { AntDesign } from "@expo/vector-icons";

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
        <TouchableOpacity style={{ paddingLeft: 20 }}>
          <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
