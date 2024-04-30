import { StyleSheet } from "react-native";
import SignupForm from "../../components/onboarding/signupform";
export default function Signup({ navigation }) {
    return <SignupForm navigation={navigation}/>;
}
const styles = StyleSheet.create({
    containerView: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginBottom: 50,
    },
});
