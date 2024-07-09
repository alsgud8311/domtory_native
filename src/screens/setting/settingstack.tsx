import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { stackScreenOptionsWithTitle } from "../../constants/screenoptions";
import PasswordChange from "./passwordchange";
import Mypage from "./mypage";
import { useAuth } from "../../store/AuthContext";
import { useEffect } from "react";
import NotificationSetting from "./notification";
import { ProviderType } from "../../store/authmodel";
import { useColorStore } from "../../store/colorstore";

export default function SettingStack() {
  const Stack = createNativeStackNavigator();
  const { authState } = useAuth<ProviderType>();
  const darkmode = useColorStore((state) => state.darkmode);

  useEffect(() => {
    console.log(authState);
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="내 정보 탭"
      screenOptions={stackScreenOptionsWithTitle(darkmode)}
    >
      <Stack.Screen
        name="내 정보"
        component={Mypage}
        options={{
          title: "내 정보",
        }}
      />
      <Stack.Screen name="비밀번호 변경" component={PasswordChange} />
      <Stack.Screen name="알림 설정" component={NotificationSetting} />
    </Stack.Navigator>
  );
}
