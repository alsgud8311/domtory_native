import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import {
  stackScreenOptionsWithTitle,
  stackscreenOptions,
} from "../../constants/screenoptions";
import PasswordChange from "./passwordchange";
import Mypage from "./mypage";
import Header from "../../components/common/header";

export default function SettingStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="내 정보 탭"
      screenOptions={stackScreenOptionsWithTitle}
    >
      <Stack.Screen
        name="내 정보"
        component={Mypage}
        options={{
          headerLeft: () => {
            return <Header />;
          },
          headerBackTitleStyle: {
            color: "black",
          },
          title: "내 정보",
        }}
      />
      <Stack.Screen name="비밀번호 변경" component={PasswordChange} />
    </Stack.Navigator>
  );
}