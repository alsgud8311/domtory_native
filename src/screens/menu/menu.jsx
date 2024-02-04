import { Text, ScrollView, StyleSheet } from "react-native";
import Datecard from '../../components/menu/datecard'
import Dailymenu from '../../components/menu/dailymenu'

export default function Menu() {
  return (
    <ScrollView style={styles.container}>
      <Datecard/>
      <Dailymenu/>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
});
