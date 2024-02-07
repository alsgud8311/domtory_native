import { Image, View } from "react-native";
import logo from "../../assets/adaptive-icon.png";

export default function Header() {
  return (
    <View style={{ justifyContent: "center" }}>
      <Image source={logo} style={{ width: 50, height: 50 }} />
    </View>
  );
}
