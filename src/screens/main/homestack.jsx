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
import CbhsNoticeDetail from "../notice/cbhsNoticeDetail"
import CouncilNoticeDetail from "../notice/CouncilNoticeDetail";
import Header from "../../components/common/header";
import { stackscreenOptions } from "../../constants/screenoptions";
import { Image } from "react-native";
import domtoryText from "../../assets/domtory_text.png";
import { AntDesign } from "@expo/vector-icons";
import PostDetail from "../../components/board/postDetail";

function Logo() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image source={logo} style={{ width: 50, height: 50 }} />
    </View>
  );
}

const HomeStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackscreenOptions}>
      <Stack.Screen
        name="Domtory Main"
        component={Home}
        options={{
          title: "",
          header: () => {
            return <Header navigation={navigation} />;
          },
          headerBackTitleStyle: {
            color: "black",
          },
        }}
      />
      <Stack.Screen name="학사 식단" component={Menu} />
      <Stack.Screen name="학사내 공지사항" component={CbhsNotice}/>
      <Stack.Screen name="공지사항 글 보기" component={CbhsNoticeDetail} />
      <Stack.Screen name="자율회 공지사항" component={CbhsNotice} />
      <Stack.Screen
        name="자율회 공지사항 글 보기"
        component={CouncilNoticeDetail}
      />
      {/* <Stack.Screen name="자유게시판"
        component={General}
        options={{
          headerRight: () => {
            return <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>}
          ,}} /> */}
      {/* <Stack.Screen name="자유게시판 글 보기" component={GeneralDetail} /> */}
      {/* <Stack.Screen name="중고거래 게시판" component={FleeMarket} />
      <Stack.Screen name="중고거래 글 보기" component={FleeMarketDetail} /> */}
      {/* <Stack.Screen name="번개모임 게시판" component={Impromptu} />
      <Stack.Screen name="번개모임 글 보기" component={ImpromptuDetail} />
      <Stack.Screen name="취준생 게시판" component={Jobseeker} />
      <Stack.Screen name="취준생 글 보기" component={JobseekerDetail} />
      <Stack.Screen name="분실물 게시판" component={LostAndFound} />
      <Stack.Screen name="분실물 글 보기" component={LostAndFoundDetail} /> */}
      <Stack.Screen name="설정" component={Setting} />
      <Stack.Screen name="검색" component={Search} />
      <Stack.Screen name="글 보기" component={PostDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
