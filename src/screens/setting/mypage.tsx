import { View } from "react-native";
import MypageCard from "../../components/mypage/mypagecard";
import Profile from "../../components/mypage/profile";
import { useColorStore } from "../../store/colorstore";

export default function Mypage({ navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: darkmode ? "black" : "white",
        height: "100%",
      }}
    >
      <Profile />
      <MypageCard navigation={navigation} />
    </View>
  );
}
