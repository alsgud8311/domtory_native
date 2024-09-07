import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "../../components/onboarding/loginform";
import SignupForm from "../../components/onboarding/signupform";

export default function LoginStack({ navigation }) {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
  };
  return (
    <Stack.Navigator
      initialRouteName="로그인 스택"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="로그인" component={LoginForm} />
      <Stack.Screen
        name="회원가입"
        component={SignupForm}
        options={{ headerShown: true, headerTintColor: "orange" }}
      />
    </Stack.Navigator>
  );
}
