import React, { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";
import { useFocusEffect } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({ email: null, detail: "" });
  const { onLogin, onRegister } = useAuth();
  //다른 스택 컴포넌트로 갔다가 돌아오는 상태를 관찰하는 훅
  useFocusEffect(
    useCallback(() => {
      // 스크린이 포커스 될 때 실행될 로직
      setEmail("");
      setPassword("");
    }, [])
  );

  const login = async () => {
    const { success, data } = await onLogin(email, password);
    if (success) {
      navigation.navigate("홈 탭");
    } else {
      setLoginError(data);
      if (loginError.detail) {
        Alert.alert(loginError.detail);
        return;
      }
    }
  };

  const onSignupPress = () => {
    navigation.navigate("회원가입");
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginFormView}>
          <Image source={logo} style={{ width: 200, height: 200 }} />
          <Text style={styles.logoText}>돔토리</Text>
          <Text style={{ fontSize: 15, marginBottom: 20, fontWeight: 700 }}>
            돔토리는 충북학사생 전용 커뮤니티 서비스입니다.
          </Text>
          <View styles={styles.inputWrapper}>
            <TextInput
              autoCorrect={false}
              spellCheck={false}
              placeholder="이메일"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {loginError.email ? (
              <Text style={{ color: "red" }}>{loginError.email}</Text>
            ) : null}
            <TextInput
              autoCorrect={false}
              spellCheck={false}
              placeholder="비밀번호"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
              로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => onSignupPress()}
          >
            <Text style={{ fontSize: 20, color: "orange", fontWeight: 700 }}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
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
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  loginFormView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    flexDirection: "column",
    gap: 30,
  },
  loginFormTextInput: {
    width: 350,
    height: 60,
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "orange",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  loginButton: {
    color: "orange",
    backgroundColor: "orange",
    borderRadius: 15,
    width: 350,
    height: 60,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButton: {
    width: 200,
    height: 45,
    marginTop: 30,
    backgroundColor: "#fff5d3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
