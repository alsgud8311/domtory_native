import { ScrollView, Text } from "react-native";
import MypageCard from "../../components/mypage/mypagecard";
import Profile from "../../components/mypage/profile";

export default function Mypage({ navigation }) {
  return (
    <ScrollView>
      <Profile />
      <MypageCard navigation={navigation} />
    </ScrollView>
  );
}
