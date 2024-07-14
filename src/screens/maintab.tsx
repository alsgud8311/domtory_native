import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeStack from "./main/homestack";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import CommunityStack from "./community/communitystack";
import SettingStack from "./setting/settingstack";
import MessageStack from "./message/messageStack";
import { useColorStore } from "../store/colorstore";
import { useMemo } from "react";

const MainTab = () => {
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);
  const Tab = createBottomTabNavigator();
  const screenOptions: BottomTabNavigationOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      height: 70,
      backgroundColor: darkmode ? "black" : "#fff",
    },
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: "Home",
          // 속성에서 focused 뽑아내서 활성상태 여부 검사해서 색상 변경
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <AntDesign
                name="home"
                size={25}
                color={focused ? "orange" : "gray"}
              />
              <Text style={styles.text}>홈</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityStack}
        options={{
          title: "Community",
          // 속성에서 focused 뽑아내서 활성상태 여부 검사해서 색상 변경
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="comment-text-multiple"
                size={23}
                color={focused ? "orange" : "gray"}
              />
              <Text style={styles.text}>게시판</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={{
          title: "Message",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Entypo
                name="chat"
                size={23}
                color={focused ? "orange" : "gray"}
              />
              <Text style={styles.text}>쪽지</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          title: "Mypage",
          // 속성에서 focused 뽑아내서 활성상태 여부 검사해서 색상 변경
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="face-man-profile"
                size={25}
                color={focused ? "orange" : "gray"}
              />
              <Text style={styles.text}>내 정보</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};
const createStyles = (darkmode: boolean) => {
  return StyleSheet.create({
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    },
    text: {
      marginTop: 5,
      color: darkmode ? "#fff" : "gray",
    },
  });
};
export default MainTab;
