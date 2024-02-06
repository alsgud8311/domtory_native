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
import CbhsNotice from "../notice/cbhsNotice/cbhsNotice";
import CouncilNotice from "../notice/councilNotice/CouncilNotice";
import CouncilNoticeDetail from "../notice/councilNotice/CouncilNoticeDetail";
import Header from "../../components/common/header";
import { stackscreenOptions } from "../../constants/screenoptions";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackscreenOptions}>
      <Stack.Screen
        name="Domtory Main"
        component={Home}
        options={{
          headerLeft: () => {
            return <Header />;
          },
          title: "",
          headerBackTitleStyle: {
            color: "black",
          },
        }}
      />
      <Stack.Screen name="학사 식단" component={Menu} />
      <Stack.Screen name="학사내 공지사항" component={CbhsNotice} />
      <Stack.Screen name="학사내 공지사항 글 보기" component={CbhsNotice} />
      <Stack.Screen name="자율회 공지사항" component={CouncilNotice} />
      <Stack.Screen
        name="자율회 공지사항 글 보기"
        component={CouncilNoticeDetail}
      />
      <Stack.Screen name="중고거래 게시판" component={FleeMarket} />
      <Stack.Screen name="중고거래 글 보기" component={FleeMarketDetail} />
      <Stack.Screen name="자유게시판" component={General} />
      <Stack.Screen name="자유게시판 글 보기" component={GeneralDetail} />
      <Stack.Screen name="번개모임 게시판" component={Impromptu} />
      <Stack.Screen name="번개모임 글 보기" component={ImpromptuDetail} />
      <Stack.Screen name="취준생 게시판" component={Jobseeker} />
      <Stack.Screen name="취준생 글 보기" component={JobseekerDetail} />
      <Stack.Screen name="분실물 게시판" component={LostAndFound} />
      <Stack.Screen name="분실물 글 보기" component={LostAndFoundDetail} />
      <Stack.Screen name="설정" component={Setting} />
    </Stack.Navigator>
  );
};

export default HomeStack;
