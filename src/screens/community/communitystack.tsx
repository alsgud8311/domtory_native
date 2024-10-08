import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CommunityShortCuts from "./shortcuts/communityShortcuts";
//게시판
import Popular from "./popular/popular";
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
import CbhsNoticeDetail from "../notice/cbhsNoticeDetail";
//내가 쓴 글, 댓글
import MyPosting from "./mypost/mypost";
import Mycomment from "./mypost/mycomment";
// 쪽지방
import MessageDetail from "../message/messageDetail";
import Search from "../search/search";

import Header from "../../components/common/header";
import {
  stackScreenOptionsWithTitle,
  stackscreenOptions,
} from "../../constants/screenoptions";

import { AntDesign, Feather } from "@expo/vector-icons";
import Popup from "../../components/board/popup";
import CouncilNoticeDetail from "../notice/CouncilNoticeDetail";
import MyComment from "./mypost/mycomment";
import PostFix from "../board/postfix";
import Bookmark from "./bookmark/bookmark";
import BookmarkDetail from "./bookmark/bookmarkDetail";
import { useColorStore } from "../../store/colorstore";
import CombinedGeneral from "./combinedGeneral/combinedGeneral";
import CombinedGeneralDetail from "./combinedGeneral/combinedGeneralDetail";

const CommunityStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const darkmode = useColorStore((state) => state.darkmode);
  return (
    <Stack.Navigator
      initialRouteName="커뮤니티 바로가기 탭"
      screenOptions={stackScreenOptionsWithTitle(darkmode)}
    >
      <Stack.Screen
        name="커뮤니티 바로가기"
        component={CommunityShortCuts}
        options={{
          title: "게시판",
        }}
      />
      <Stack.Screen name="내가 쓴 글" component={MyPosting} />
      <Stack.Screen name="내가 쓴 댓글" component={Mycomment} />
      <Stack.Screen name="공지사항" component={CbhsNotice} />
      <Stack.Screen name="내가 스크랩한 글" component={Bookmark} />
      <Stack.Screen
        name="스크랩한 글 보기"
        component={BookmarkDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="통합게시판"
        component={CombinedGeneral}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color={darkmode ? "white" : "black"}
                onPress={() =>
                  navigation.navigate("검색", { board: "통합 게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="통합 게시판"
        component={CombinedGeneralDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="자유 게시판"
        component={GeneralDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
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
        name="핫도토리 게시판"
        component={Popular}
        options={{
          headerRight: () => {
            return (
              <AntDesign
                name="search1"
                size={30}
                color="black"
                onPress={() =>
                  navigation.navigate("검색", { board: "핫도토리게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="취준생게시판"
        component={JobseekerDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
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
                onPress={() =>
                  navigation.navigate("검색", { board: "취준생 게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="번개모임게시판"
        component={ImpromptuDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
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
                onPress={() =>
                  navigation.navigate("검색", { board: "번개모임 게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="중고거래게시판"
        component={FleeMarketDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
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
                onPress={() =>
                  navigation.navigate("검색", { board: "중고거래 게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="분실물게시판"
        component={LostAndFoundDetail}
        options={({ navigation }) => ({
          headerRight: () => <Popup navigation={navigation} />,
        })}
      />
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
                onPress={() =>
                  navigation.navigate("검색", { board: "분실물 게시판" })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen name="검색" component={Search} />
      <Stack.Screen name="자율회 공지사항" component={CouncilNoticeDetail} />
      <Stack.Screen
        name="게시글 수정"
        component={PostFix}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;
