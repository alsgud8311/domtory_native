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

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
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
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
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
