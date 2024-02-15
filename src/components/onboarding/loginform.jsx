import React, { useCallback, useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";
import { useFocusEffect } from "@react-navigation/native";
import { requestUserPermission } from "../../utils/firebase/firebaseSetting";
import messaging from "@react-native-firebase/messaging";

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({ email: null, detail: "" });
  const { onLogin, onRegister } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  //다른 스택 컴포넌트로 갔다가 돌아오는 상태를 관찰하는 훅
  useFocusEffect(
    useCallback(() => {
      // 스크린이 포커스 될 때 실행될 로직
      setEmail("");
      setPassword("");
    }, [])
  );
  useEffect(() => {
    if (email.includes("@") && password.length > 5) {
      setLoginValid(true);
    } else {
      setLoginValid(false);
    }
  }, [email, password]);

  const login = async () => {
    setIsLoading(true);
    const { success, data } = await onLogin(email, password);
    if (success) {
      console.log("login success");
    } else {
      setLoginError(data);
      if (loginError.detail) {
        Alert.alert(loginError.detail);
        setIsLoading(false);
        return;
      }
      Alert.alert(
        "로그인 오류",
        "로그인 중에 오류가 발생했습니다. 다시 시도해 주시겠어요?"
      );
      setIsLoading(false);
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
            충북학사생 전용 커뮤니티 서비스
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              autoCorrect={false}
              spellCheck={false}
              placeholder="학사번호(- 포함)"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
              autoCapitalize="none"
            />
            {loginError.email ? (
              <Text style={{ color: "red" }}>{loginError.email}</Text>
            ) : null}
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                autoCapitalize="none"
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
            <View>
              <Text>🔒초기 비밀번호는 생년월일 6자리입니다.🔒</Text>
            </View>
          </View>
          {isLoading ? (
            <TouchableOpacity style={styles.loginButton}>
              <ActivityIndicator color="lemonchiffon" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.loginButton,
                loginValid ? null : styles.disabledButton,
              ]}
              onPress={login}
              disabled={!loginValid}
            >
              <Text style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
                로그인
              </Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={styles.signupButton}
            onPress={() => onSignupPress()}
            disabled={isLoading}
          >
            <Text style={{ fontSize: 20, color: "orange", fontWeight: 700 }}>
              회원가입
            </Text>
          </TouchableOpacity> */}
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
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    flexDirection: "column",
    gap: 20,
  },
  loginFormTextInput: {
    width: "90%",
    height: 60,
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "orange",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
  },
  loginButton: {
    color: "orange",
    backgroundColor: "orange",
    borderRadius: 15,
    width: "80%",
    height: 60,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    color: "white",
    backgroundColor: "#eaeaea",
    borderRadius: 15,
    width: "80%",
    height: 60,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signupButton: {
    width: "60%",
    height: 45,
    marginTop: 30,
    backgroundColor: "#fff5d3",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 15,
  },
});
