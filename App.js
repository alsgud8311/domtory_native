import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DailyMenuCard from "./src/components/main/menucard";
import Shortcuts from "./src/components/main/shortcuts";
import CommunityCard from "./src/components/main/communitycard";
import NoticeCard from "./src/components/main/noticecard";
import RecentPostCard from "./src/components/main/recentcard";
import CouncilNoticeCard from "./src/components/main/councilnoticecard";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <DailyMenuCard />
      <Shortcuts />
      <CouncilNoticeCard />
      <NoticeCard />
      <CommunityCard />
      <RecentPostCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 50,
    padding: 20,
  },
  menucard: {
    width: "100%",
  },
});
