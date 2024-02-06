import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import DailyMenuCard from "../../components/main/menucard";
import Shortcuts from "../../components/main/shortcuts";
import CommunityCard from "../../components/main/communitycard";
import NoticeCard from "../../components/main/noticecard";
import RecentPostCard from "../../components/main/recentcard";
import CouncilNoticeCard from "../../components/main/councilnoticecard";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

export default function Home({ navigation }) {
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (requestUserPermission()) {
      //기기별 fcm 토큰 받기
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Failed token status", authStatus);
    }

    //개별 알림이 사용가능한지 확인
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "종료 상태에서 열렸을 때 알림 상태",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "백그라운드 상태에서 알림 열었을 때",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("백그라운드 메세지 받기", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        <DailyMenuCard navigation={navigation} />
        <Shortcuts navigation={navigation} />
        <CouncilNoticeCard navigation={navigation} />
        <NoticeCard navigation={navigation} />
        <CommunityCard navigation={navigation} />
        <RecentPostCard navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
});
