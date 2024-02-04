import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./main/home";
import CommunityShortCuts from "./community/shortcuts/communityShortcuts";
import Setting from "./setting/Setting";
import HomeStack from "./main/homestack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const MainTab = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarstyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      height: 100,
      background: "#fff",
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <AntDesign
                name="home"
                size={25}
                color={focused ? "orange" : "gray"}
              />
              <Text style={{ marginTop: 5, color: "gray" }}>홈</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityShortCuts}
        options={{
          title: "Community",
          // 속성에서 focused 뽑아내서 활성상태 여부 검사해서 색상 변경
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name="comment-text-multiple"
                size={23}
                color={focused ? "orange" : "gray"}
              />
              <Text style={{ marginTop: 5, color: "gray" }}>게시판</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          title: "Home",
          // 속성에서 focused 뽑아내서 활성상태 여부 검사해서 색상 변경
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name="face-man-profile"
                size={25}
                color={focused ? "orange" : "gray"}
              />
              <Text style={{ marginTop: 5, color: "gray" }}>내 정보</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
