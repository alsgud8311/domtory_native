import { Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/main/home";
import icon from "./src/assets/domtory_icon.png";
import MainTab from "./src/screens/maintab";
import { AuthProvider, useAuth } from "./src/store/AuthContext";
import Login from "./src/screens/login/login";
import LoginStack from "./src/screens/login/loginStack";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import analytics from "@react-native-firebase/analytics";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
};

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const activeAnalytics = async () => {
    await analytics().setAnalyticsCollectionEnabled(true);
    console.log("등록됨");
  };
  useEffect(() => {
    if (!authState.authenticated) {
      console.log("로그아웃 상태");
    }
    activeAnalytics();
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, [authState.authenticated]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="온보딩" screenOptions={screenOptions}>
        {authState.authenticated ? (
          <Stack.Screen name="홈 탭" component={MainTab} />
        ) : (
          <Stack.Screen name="로그인 스택" component={LoginStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
