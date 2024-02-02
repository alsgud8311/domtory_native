import { Image, StyleSheet, View, Text } from "react-native";
import announcement from "../../assets/announcement.png";
import tools from "../../assets/tools.png";
import dorm from "../../assets/dorm.png";
import night from "../../assets/night.png";
import books from "../../assets/books.png";

export default function Shortcuts() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Image style={styles.buttons} source={dorm} />
        <Text>충북학사</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Image style={styles.buttons} source={night} />
        <Text>외박신청</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Image style={styles.buttons} source={announcement} />
        <Text>공지사항</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Image style={styles.buttons} source={tools} />
        <Text>보수요청</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Image style={styles.buttons} source={books} />
        <Text>도서관</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    textAlign: "center",
    width: "20%",
    height: 100,
  },
  buttons: {
    width: 60,
    height: 60,
  },
});
