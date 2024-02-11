import { Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/main/home";
import icon from "./src/assets/domtory_icon.png";
import MainTab from "./src/screens/maintab";
import { AuthProvider, useAuth } from "./src/store/AuthContext";
import Login from "./src/screens/login/login";
import Signup from "./src/screens/login/signup";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";

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
  console.log(authState);
  useEffect(() => {
    if (!authState.authenticated) {
      console.log("로그아웃 되었습니다.");
    }
  }, [authState.authenticated]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="온보딩" screenOptions={screenOptions}>
        {authState.authenticated ? (
          <Stack.Screen name="홈 탭" component={MainTab} />
        ) : (
          <>
            <Stack.Screen name="로그인" component={Login} />
            <Stack.Screen
              name="회원가입"
              component={Signup}
              options={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerTintColor: "orange",
                title: "",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
