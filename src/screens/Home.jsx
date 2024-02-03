import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DailyMenuCard from "../components/main/menucard";
import Shortcuts from "../components/main/shortcuts";
import CommunityCard from "../components/main/communitycard";
import NoticeCard from "../components/main/noticecard";
import RecentPostCard from "../components/main/recentcard";
import CouncilNoticeCard from "../components/main/councilnoticecard";
import BottomTabBar from "../components/common/bottomtab";

export default function Home() {
  return (
    <View>
      <ScrollView style={styles.container}>
        <DailyMenuCard />
        <Shortcuts />
        <CouncilNoticeCard />
        <NoticeCard />
        <CommunityCard />
        <RecentPostCard />
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
