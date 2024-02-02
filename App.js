import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DailyMenuCard from "./src/components/main/menucard";
import Shortcuts from "./src/components/main/shortcuts";

export default function App() {
  return (
    <View style={styles.container}>
      <DailyMenuCard style={styles.menucard} />
      <Shortcuts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
  },
  menucard: {
    width: "100%",
  },
});
