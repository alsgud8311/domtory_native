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
import MyPosting from "./mypost/mypost";
import Mycomment from "./mypost/mycomment";
import { AntDesign } from "@expo/vector-icons";

const CommunityStack = ({navigation}) => {
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
      <Stack.Screen name="자유게시판" 
        component={General} 
        options={{
          headerRight: () => {
            return <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>}
          ,}} />
      <Stack.Screen name="취준생 게시판" 
        component={Jobseeker} 
        options={{
          headerRight: () => {
            return <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>}
          ,}} />
      <Stack.Screen name="번개모임 게시판" 
        component={Impromptu} 
        options={{
          headerRight: () => {
            return <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>}
          ,}} />
      <Stack.Screen name="중고거래 게시판" 
        component={FleeMarket} 
        options={{
          headerRight: () => {
            return <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>}
          ,}} />
      <Stack.Screen name="분실물 게시판" 
        component={LostAndFound} 
        options={{
          headerRight: () => {
            return <AntDesign name="search1" size={30} color="black" onPress={() => navigation.navigate("검색")}/>}
          ,}} />
    </Stack.Navigator>
  );
};

export default CommunityStack;
