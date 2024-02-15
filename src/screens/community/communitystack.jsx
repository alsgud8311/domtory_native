import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommunityShortCuts from "./shortcuts/communityShortcuts";
//게시판
import General from "./general/general";
import GeneralDetail from "./general/generalDetail";
import FleeMarket from "./fleemarket/fleemarket";
import FleeMarketDetail from "./fleemarket/fleemarketDetail";
import Impromptu from "./impromptu/impromptu";
import ImpromptuDetail from "./impromptu/impromptuDetail";
import Jobseeker from "./jobseeker/jobseeker";
import JobseekerDetail from "./jobseeker/jobseekerDetail";
import LostAndFound from "./lostandfound/lostandfound";
import LostAndFoundDetail from "./lostandfound/lostandfoundDetail";
//공지사항
import CbhsNotice from "../notice/cbhsNotice";
//내가 쓴 글, 댓글
import MyPosting from "./mypost/mypost";
import Mycomment from "./mypost/mycomment";

import Header from "../../components/common/header";
import { stackScreenOptionsWithTitle, stackscreenOptions } from "../../constants/screenoptions";



import { AntDesign } from "@expo/vector-icons";


const CommunityStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="커뮤니티 바로가기 탭"
      screenOptions={stackScreenOptionsWithTitle}
    >
      <Stack.Screen
        name="커뮤니티 바로가기"
        component={CommunityShortCuts}
        options={{
          title: "게시판",
          headerBackTitleStyle: {
            color: "black",
          },
        }}
      />
      <Stack.Screen name="내가 쓴 글" component={MyPosting} />
      <Stack.Screen name="내가 쓴 댓글" component={Mycomment} />
      <Stack.Screen name="공지사항" component={CbhsNotice} />
      <Stack.Screen name="자유 게시판" component={GeneralDetail} />
      <Stack.Screen
        name="자유게시판"
        component={General}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color="black"
                onPress={() => navigation.navigate("검색")}
              />
            );
          },
        }}
      />
      <Stack.Screen name="취준생게시판" component={JobseekerDetail} />
      <Stack.Screen
        name="취준생 게시판"
        component={Jobseeker}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color="black"
                onPress={() => navigation.navigate("검색")}
              />
            );
          },
        }}
      />
      <Stack.Screen name="번개모임게시판" component={ImpromptuDetail} />
      <Stack.Screen
        name="번개모임 게시판"
        component={Impromptu}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color="black"
                onPress={() => navigation.navigate("검색")}
              />
            );
          },
        }}
      />
      <Stack.Screen name="중고거래게시판" component={FleeMarketDetail} />
      <Stack.Screen
        name="중고거래 게시판"
        component={FleeMarket}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color="black"
                onPress={() => navigation.navigate("검색")}
              />
            );
          },
        }}
      />
      <Stack.Screen name="분실물게시판" component={LostAndFoundDetail} />
      <Stack.Screen
        name="분실물 게시판"
        component={LostAndFound}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color="black"
                onPress={() => navigation.navigate("검색")}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;
