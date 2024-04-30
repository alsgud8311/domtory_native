import { View } from "react-native";
import MypageCard from "../../components/mypage/mypagecard";
import Profile from "../../components/mypage/profile";
export default function Mypage({ navigation }) {
    return (<View style={{ width: "100%", backgroundColor: "white", height: "100%" }}>
      <Profile />
      <MypageCard navigation={navigation}/>
    </View>);
}
