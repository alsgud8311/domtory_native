import Home from "./home";
import Setting from "../setting/settingstack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FleeMarket from "../community/fleemarket/fleemarket";
import FleeMarketDetail from "../community/fleemarket/fleemarketDetail";
import Impromptu from "../community/impromptu/impromptu";
import ImpromptuDetail from "../community/impromptu/impromptuDetail";
import Jobseeker from "../community/jobseeker/jobseeker";
import JobseekerDetail from "../community/jobseeker/jobseekerDetail";
import LostAndFound from "../community/lostandfound/lostandfound";
import LostAndFoundDetail from "../community/lostandfound/lostandfoundDetail";
import General from "../community/general/general";
import GeneralDetail from "../community/general/generalDetail";
import Menu from "../menu/menu";
import Search from "../search/search";
import CbhsNotice from "../notice/cbhsNotice";
import CbhsNoticeDetail from "../notice/cbhsNoticeDetail";
import CouncilNoticeDetail from "../notice/CouncilNoticeDetail";
import Header from "../../components/common/header";
import { stackscreenOptions } from "../../constants/screenoptions";
import { Image } from "react-native";
import domtoryText from "../../assets/domtory_text.png";
import { AntDesign, Entypo } from "@expo/vector-icons";
import PostDetail from "../../components/board/postDetail";
import PopupMenu from "../../components/board/popup";
import PostFix from "../board/postfix";
import NotificationList from "./notification";
import Popular from "../community/popular/popular";
function Logo() {
    return (<View style={{ flex: 1, justifyContent: "center" }}>
      <Image source={logo} style={{ width: 50, height: 50 }}/>
    </View>);
}
const HomeStack = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    return (<Stack.Navigator initialRouteName="Home" screenOptions={stackscreenOptions}>
      <Stack.Screen name="Domtory Main" component={Home} options={{
            title: "",
            header: () => {
                return <Header navigation={navigation}/>;
            },
            headerBackTitleStyle: {
                color: "black",
            },
        }}/>
      <Stack.Screen name="학사 식단" component={Menu}/>
      <Stack.Screen name="공지사항" component={CbhsNotice}/>
      <Stack.Screen name="학사내 공지사항" component={CbhsNoticeDetail}/>
      <Stack.Screen name="자율회 공지사항" component={CouncilNoticeDetail}/>
      <Stack.Screen name="전체검색" component={Search}/>
      <Stack.Screen name="자유게시판" component={General} options={{
            headerRight: () => {
                return (<AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색", { board: "자유게시판" })}/>);
            },
        }}/>
      <Stack.Screen name="게시글 수정" component={PostFix} options={{ headerShown: false }}/>
      <Stack.Screen name="검색" component={Search}/>
      <Stack.Screen name="핫도토리 게시판" component={Popular} options={{
            headerRight: () => {
                return (<AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색", { board: "핫도토리게시판" })}/>);
            },
        }}/>
      <Stack.Screen name="자유 게시판" component={GeneralDetail} options={({ navigation }) => ({
            headerRight: () => <PopupMenu navigation={navigation}/>,
        })}/>
      <Stack.Screen name="취준생게시판" component={JobseekerDetail} options={({ navigation }) => ({
            headerRight: () => <PopupMenu navigation={navigation}/>,
        })}/>
      <Stack.Screen name="번개모임게시판" component={ImpromptuDetail} options={({ navigation }) => ({
            headerRight: () => <PopupMenu navigation={navigation}/>,
        })}/>
      <Stack.Screen name="중고거래게시판" component={FleeMarketDetail} options={({ navigation }) => ({
            headerRight: () => <PopupMenu navigation={navigation}/>,
        })}/>
      <Stack.Screen name="분실물게시판" component={LostAndFoundDetail} options={({ navigation }) => ({
            headerRight: () => <PopupMenu navigation={navigation}/>,
        })}/>
      <Stack.Screen name="알림" component={NotificationList}/>
    </Stack.Navigator>);
};
export default HomeStack;
