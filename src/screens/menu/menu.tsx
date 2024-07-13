import { Text, ScrollView, StyleSheet } from "react-native";
import Datecard from "../../components/menu/datecard";
import { useColorStore } from "../../store/colorstore";
import { useMemo } from "react";

export default function Menu() {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  return (
    <ScrollView style={styles.container}>
      <Datecard />
      {/* <Dailymenu /> */}
    </ScrollView>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: darkmode ? "black" : "white",
      padding: 20,
    },
  });
};
