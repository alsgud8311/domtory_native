import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import announcement from "../../assets/announcement.png";
import { openBrowserAsync } from "expo-web-browser";
import tools from "../../assets/tools.png";
import dorm from "../../assets/dorm.png";
import night from "../../assets/night.png";
import books from "../../assets/books.png";
import { useCallback, useMemo, useState } from "react";
import { useColorStore } from "../../store/colorstore";

export default function Shortcuts({ navigation }) {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  return (
    <>
      <View style={styles.container}>
        {/* 일반 버튼은 안에 이미지를 넣을 수 없으므로 TouchableOpacity 사용 */}
        <TouchableOpacity
          style={styles.buttonWrapper}
          //버튼을 누르면 각 해당하는 페이지를 외부 브라우저(사파리 등)에서 열 수 있게 해줌
          onPress={() => openBrowserAsync("http://www.cbhs2.kr/main")}
        >
          <Image style={styles.buttons} source={dorm} />
          <Text style={styles.generalText}>충북학사</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() =>
            openBrowserAsync(
              "http://1.246.219.13:8080/cbhs/indexstdds.html?var1=M000004116"
            )
          }
        >
          <Image style={styles.buttons} source={night} />
          <Text style={styles.generalText}>외박신청</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          // 학사내 공지사항으로 navigate
          onPress={() => navigation.navigate("공지사항", { div: "cbhs" })}
        >
          <Image style={styles.buttons} source={announcement} />
          <Text style={styles.generalText}>공지사항</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() =>
            openBrowserAsync(
              "http://1.246.219.13:8080/cbhs/indexstdds.html?var1=M000004115"
            )
          }
        >
          <Image style={styles.buttons} source={tools} />
          <Text style={styles.generalText}>보수요청</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => openBrowserAsync("http://www.cbhs2.kr/0000038")}
        >
          <Image style={styles.buttons} source={books} />
          <Text style={styles.generalText}>도서관</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonWrapper: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "20%",
      height: 100,
    },
    buttons: {
      width: 60,
      height: 60,
    },
    generalText: {
      color: darkmode ? "white" : "black",
    },
  });
};
