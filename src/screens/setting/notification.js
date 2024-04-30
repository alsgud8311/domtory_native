import { StyleSheet, Text, View } from "react-native";
import SettingView from "../../components/notificationsetting/settingview";
import { SafeAreaView } from "react-native-safe-area-context";
export default function NotificationSetting({ navigation }) {
    return (<View style={styles.container}>
      <SettingView navigation={navigation}/>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
});
