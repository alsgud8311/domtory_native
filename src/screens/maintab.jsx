import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./main/home";
import CommunityShortCuts from "./community/shortcuts/communityShortcuts";
import Setting from "./setting/Setting";

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
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Community" component={CommunityShortCuts}></Tab.Screen>
      <Tab.Screen name="Setting" component={Setting}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTab;
