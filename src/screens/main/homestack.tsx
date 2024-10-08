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
import { AntDesign, Feather } from "@expo/vector-icons";
import PopupMenu from "../../components/board/popup";
import PostFix from "../board/postfix";
import NotificationList from "./notification";
import Popular from "../community/popular/popular";
import { useColorStore } from "../../store/colorstore";
import Message from "../message/message";
import MessageDetail from "../message/messageDetail";
import CombinedGeneral from "../community/combinedGeneral/combinedGeneral";
import CombinedGeneralDetail from "../community/combinedGeneral/combinedGeneralDetail";

const HomeStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const darkmode = useColorStore((state) => state.darkmode);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={stackscreenOptions(darkmode)}
    >
      <Stack.Screen
        name="Domtory Main"
        component={Home}
        options={{
          title: "",
          header: () => {
            return <Header navigation={navigation} />;
          },
        }}
      />
      <Stack.Screen name="학사 식단" component={Menu} />
      <Stack.Screen name="공지사항" component={CbhsNotice} />
      <Stack.Screen name="학사내 공지사항" component={CbhsNoticeDetail} />
      <Stack.Screen name="자율회 공지사항" component={CouncilNoticeDetail} />
      <Stack.Screen name="전체검색" component={Search} />
      <Stack.Screen
        name="자유게시판"
        component={General}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color={darkmode ? "white" : "black"}
                onPress={() =>
                  navigation.navigate("검색", { board: "자유게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="게시글 수정"
        component={PostFix}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="검색" component={Search} />
      <Stack.Screen
        name="핫도토리 게시판"
        component={Popular}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color={darkmode ? "white" : "black"}
                onPress={() =>
                  navigation.navigate("검색", { board: "핫도토리게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="통합 게시판"
        component={CombinedGeneral}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color={darkmode ? "white" : "black"}
                onPress={() =>
                  navigation.navigate("검색", { board: "통합게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="자유 게시판"
        component={GeneralDetail}
        options={({ navigation }) => ({
          headerRight: () => <PopupMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="취준생게시판"
        component={JobseekerDetail}
        options={({ navigation }) => ({
          headerRight: () => <PopupMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="번개모임게시판"
        component={ImpromptuDetail}
        options={({ navigation }) => ({
          headerRight: () => <PopupMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="중고거래게시판"
        component={FleeMarketDetail}
        options={({ navigation }) => ({
          headerRight: () => <PopupMenu navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="통합게시판"
        component={CombinedGeneralDetail}
        options={({ navigation }) => ({
          headerRight: () => <PopupMenu navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="분실물게시판"
        component={LostAndFoundDetail}
        options={({ navigation }) => ({
          headerRight: () => <PopupMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen name="알림" component={NotificationList} />
      <Stack.Screen name="쪽지" component={Message} />
      <Stack.Screen
        name="쪽지방"
        component={MessageDetail}
        options={({ navigation }) => ({
          headerBackVisible: true,
          headerRight: () => (
            <Feather
              onPress={() => navigation.setParams({ showModal: true })}
              name="send"
              size={24}
              color={darkmode ? "white" : "black"}
              style={{
                paddingTop: 8,
                paddingRight: 5,
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
