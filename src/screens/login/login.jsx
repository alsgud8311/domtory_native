import { StyleSheet } from "react-native";
import LoginForm from "../../components/onboarding/loginform";

export default function LoginScreen({ navigation }) {
  return <LoginForm navigation={navigation} />;
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 300,
  },
});
