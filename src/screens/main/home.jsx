import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import DailyMenuCard from "../../components/main/menucard";
import Shortcuts from "../../components/main/shortcuts";
import CommunityCard from "../../components/main/communitycard";
import NoticeCard from "../../components/main/noticecard";
import RecentPostCard from "../../components/main/recentcard";
import CouncilNoticeCard from "../../components/main/councilnoticecard";
import { useCallback, useEffect, useRef, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { apiBe } from "../../server";
import { Notifications } from "expo";
import * as Notification from "expo-notifications";

// import * as SplashScreen from "expo-splash-screen";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const board = {
  1: "자유 게시판",
  2: "중고거래게시판",
  3: "취준생게시판",
  4: "번개모임게시판",
  5: "분실물게시판",
};

export default function Home({ navigation }) {
  const notificationListener = useRef();
  const responseListener = useRef();

  //개별 알림이 사용가능한지 확인
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log("종료 상태에서 오픈");
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("백그라운드에서 열었을 때", remoteMessage);
      if (remoteMessage.data) {
        const { postId, boardId } = remoteMessage.data;
        navigation.navigate(board[boardId], { postId: postId });
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("백그라운드 메세지 받기", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("포어그라운드", remoteMessage);
      if (remoteMessage.data.postId && remoteMessage.data.boardId) {
        const { postId, boardId } = remoteMessage.data;
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          [
            { text: "취소", style: "cancel" },
            {
              text: "보러가기",
              onPress: () => {
                navigation.navigate(board[boardId], { postId: postId });
              },
            },
          ]
        );
      } else {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body
        );
      }
    });

    return unsubscribe;
  }, []);
  return (
    <View>
      <ScrollView style={styles.container}>
        <DailyMenuCard navigation={navigation} />
        <Shortcuts navigation={navigation} />
        <RecentPostCard navigation={navigation} />
        <CommunityCard navigation={navigation} />
        <NoticeCard navigation={navigation} />
        <CouncilNoticeCard navigation={navigation} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 70,
  },
});
