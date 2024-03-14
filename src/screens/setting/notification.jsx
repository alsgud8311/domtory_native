import { StyleSheet, Text, View } from "react-native";
import SettingView from "../../components/notificationsetting/settingview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationSetting() {
  return (
    <View style={styles.container}>
      <SettingView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
