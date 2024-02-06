import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DailyMenuCard from "../../components/main/menucard";
import Shortcuts from "../../components/main/shortcuts";
import CommunityCard from "../../components/main/communitycard";
import NoticeCard from "../../components/main/noticecard";
import RecentPostCard from "../../components/main/recentcard";
import CouncilNoticeCard from "../../components/main/councilnoticecard";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/firebase/firebaseSetting";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function Home({ navigation }) {
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
