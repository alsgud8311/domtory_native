import { ScrollView, StyleSheet, View, Alert, Appearance } from "react-native";
import DailyMenuCard from "../../components/main/menucard";
import Shortcuts from "../../components/main/shortcuts";
import CommunityCard from "../../components/main/communitycard";
import NoticeCard from "../../components/main/noticecard";
import RecentPostCard from "../../components/main/recentcard";
import CouncilNoticeCard from "../../components/main/councilnoticecard";
import { useEffect, useMemo } from "react";
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { apiBe } from "../../server";
import * as Notification from "expo-notifications";
import { useAuth } from "../../store/AuthContext";
import { requestUserPermission } from "../../utils/firebase/firebaseSetting";
import * as SecureStore from "expo-secure-store";
import { pushCheckUpdate } from "../../server/notifications";
import PopularPostCard from "../../components/main/popularpostcard";
import { ProviderType } from "../../store/authmodel";
import { useColorStore } from "../../store/colorstore";

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
  const colorScheme = useColorStore((state) => state.darkmode);
  const { authState, setAuthState } = useAuth<ProviderType>();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  //개별 알림이 사용가능한지 확인
  useEffect(() => {
    const notificationCheck = async () => {
      const { AuthorizationSuccess } = await requestUserPermission();
      if (AuthorizationSuccess && authState.pushTokenActive === "NO") {
        const token = await messaging().getToken();
        setAuthState((prev) => ({ ...prev, pushToken: token }));
        await SecureStore.setItemAsync("PUSH_TOKEN", token);
        if (token) {
          console.log("Push Token: ", token);
          try {
            const data = {
              pushToken: token,
            };
            await apiBe.post("/push/token/", data);
            await SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "YES");
          } catch (error) {
            console.log("Sending Push Token error", error);
          }
        } else {
          console.log("getToken Failed");
        }
      } else {
        console.log("already registered");
      }
    };

    const fetchData = async () => {
      await notificationCheck();

      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage && remoteMessage.data) {
            const { postId, boardId, pushedAt, message_room_id } =
              remoteMessage.data;
            if (((postId && boardId) || message_room_id) && pushedAt) {
              await pushCheckUpdate(authState.id, pushedAt);
              if (boardId && postId) {
                navigation.navigate(board[`${boardId}`], { postId: postId });
              } else if (message_room_id) {
                navigation.navigate("쪽지방", { messageId: message_room_id });
              }
            } else {
              console.log("푸시 알림 데이터가 부족합니다.");
            }
          } else {
            console.log("푸시 알림 데이터가 없습니다.");
          }
        });

      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        if (remoteMessage && remoteMessage.data) {
          const { postId, boardId, pushedAt, message_room_id } =
            remoteMessage.data;
          if (((postId && boardId) || message_room_id) && pushedAt) {
            await pushCheckUpdate(authState.id, pushedAt);
            if (boardId && postId) {
              navigation.navigate(board[`${boardId}`], { postId: postId });
            } else if (message_room_id) {
              navigation.navigate("쪽지방", { messageId: message_room_id });
            }
          } else {
            console.log("푸시 알림 데이터가 부족합니다.");
          }
        } else {
          console.log("푸시 알림 데이터가 없습니다.");
        }
      });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("백그라운드 메세지 받기", remoteMessage);
      });
    };

    fetchData();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage && remoteMessage.data) {
        const { postId, boardId, pushedAt, message_room_id } =
          remoteMessage.data;
        if (((postId && boardId) || message_room_id) && pushedAt) {
          Alert.alert(
            remoteMessage.notification?.title ?? "알림",
            remoteMessage.notification?.body ?? "새로운 알림이 도착했습니다",
            [
              { text: "취소", style: "cancel" },
              {
                text: "보러가기",
                onPress: async () => {
                  await pushCheckUpdate(authState.id, pushedAt);
                  if (boardId && postId) {
                    navigation.navigate(board[`${boardId}`], {
                      postId: postId,
                    });
                  } else if (message_room_id) {
                    navigation.navigate("쪽지방", {
                      messageId: message_room_id,
                    });
                  }
                },
              },
            ]
          );
        } else {
          Alert.alert(
            remoteMessage.notification?.title ?? "알림",
            remoteMessage.notification?.body ?? "새로운 알림이 도착했습니다"
          );
        }
      } else {
        Alert.alert(
          remoteMessage.notification?.title ?? "알림",
          remoteMessage.notification?.body ?? "새로운 알림이 도착했습니다"
        );
      }
    });
    console.log("대박쓰", authState);
    return unsubscribe;
  }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        <DailyMenuCard navigation={navigation} />
        <Shortcuts navigation={navigation} />
        <RecentPostCard navigation={navigation} />
        <CommunityCard navigation={navigation} />
        <PopularPostCard navigation={navigation} />
        <NoticeCard navigation={navigation} />
        <CouncilNoticeCard navigation={navigation} />
      </ScrollView>
    </View>
  );
}
const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "#fff",
      padding: 20,
      marginBottom: 70,
    },
  });
};
