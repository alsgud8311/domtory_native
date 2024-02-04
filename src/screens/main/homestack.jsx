import Home from "./home";
import CommunityShortCuts from "../community/shortcuts/communityShortcuts";
import Setting from "../setting/Setting";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FleeMarket from "../community/fleemarket/fleemarket";
import FleeMarketDetail from "../community/fleemarket/fleemarketDetail";
import Impromptu from "../community/impromptu/impromptu";
import ImpromptuDetail from "../community/impromptu/impromptuDetail";
import Jobseeker from "../community/jobseeker/jobseeker";
import JobseekerDetail from "../community/jobseeker/jobseekerDetail";
import LostAndFound from "../community/lostandfound/lostandfound";
import LostAndFoundDetail from "../community/lostandfound/lostandfoundDetail";
import General from "../community/general/general";
import GeneralDetail from "../community/general/generalDetail";
import { Image, View } from "react-native";
import logo from "../../assets/domtory_icon.png";

function Logo() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image source={logo} style={{ width: 50, height: 50 }} />
    </View>
  );
}

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShowLabel: false,
    headerShown: true,
    headerStyle: {
      elevation: 0,
      shadowColor: "transparent",
    },
  };
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen
        name="Domtory Main"
        component={Home}
        options={{
          headerLeft: () => {
            return <Logo />;
          },
          title: "",
        }}
      />
      <Stack.Screen name="fleemarket" component={FleeMarket} />
      <Stack.Screen name="fleemarketDetail" component={FleeMarketDetail} />
      <Stack.Screen name="general" component={General} />
      <Stack.Screen name="generalDetail" component={GeneralDetail} />
      <Stack.Screen name="impromptu" component={Impromptu} />
      <Stack.Screen name="impromptuDetail" component={ImpromptuDetail} />
      <Stack.Screen name="jobseeker" component={Jobseeker} />
      <Stack.Screen name="jobseekerDetail" component={JobseekerDetail} />
      <Stack.Screen name="lostandfound" component={LostAndFound} />
      <Stack.Screen name="lostandfoundDetail" component={LostAndFoundDetail} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default HomeStack;
