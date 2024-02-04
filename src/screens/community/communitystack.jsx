import { createNativeStackNavigator } from "@react-navigation/native-stack";
import General from "./general/general";
import CommunityShortCuts from "./shortcuts/communityShortcuts";
import FleeMarket from "./fleemarket/fleemarket";
import Impromptu from "./impromptu/impromptu";
import Jobseeker from "./jobseeker/jobseeker";
import LostAndFound from "./lostandfound/lostandfound";
import Header from "../../components/common/header";
import {
  stackScreenOptionsWithTitle,
  stackscreenOptions,
} from "../../constants/screenoptions";

const CommunityStack = () => {
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
          headerLeft: () => {
            return <Header />;
          },
          title: "커뮤니티",
          headerBackTitleStyle: {
            color: "black",
          },
        }}
      />
      <Stack.Screen name="자유게시판" component={General} />
      <Stack.Screen name="취준생 게시판" component={Jobseeker} />
      <Stack.Screen name="번개모임 게시판" component={Impromptu} />
      <Stack.Screen name="중고거래 게시판" component={FleeMarket} />
      <Stack.Screen name="분실물 게시판" component={LostAndFound} />
    </Stack.Navigator>
  );
};

export default CommunityStack;
