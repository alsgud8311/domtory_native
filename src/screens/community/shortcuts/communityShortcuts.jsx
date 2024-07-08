import { ScrollView, StyleSheet, Text } from "react-native";
import ShortcutCard from "../../../components/community/shortcuts/shortcutscard";
import MyPostCard from "../../../components/community/shortcuts/mypostcard";
import { useColorStore } from "../../../store/colorstore";
import { useMemo } from "react";

export default function CommunityShortCuts({ navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  return (
    <ScrollView style={styles.container}>
      <MyPostCard navigation={navigation} />
      <ShortcutCard navigation={navigation} />
    </ScrollView>
  );
}
const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      padding: 20,
      backgroundColor: darkmode ? "black" : "#fff",
    },
  });
};
