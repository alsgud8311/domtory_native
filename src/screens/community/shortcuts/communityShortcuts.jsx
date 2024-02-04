import { ScrollView, Text } from "react-native";
import ShortcutCard from "../../../components/community/shortcuts/shortcutscard";
import MyPostCard from "../../../components/community/shortcuts/mypostcard";

export default function CommunityShortCuts({ navigation }) {
  return (
    <ScrollView style={{ width: "100%", padding: 20 }}>
      <MyPostCard navigation={navigation} />
      <ShortcutCard navigation={navigation} />
    </ScrollView>
  );
}
