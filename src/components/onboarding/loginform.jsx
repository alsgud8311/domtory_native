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
import messaging from "@react-native-firebase/messaging";
import { CheckBox } from "react-native-elements";
import { openBrowserAsync } from "expo-web-browser";

export default function LoginForm({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({ email: null, detail: "" });
  const { onLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  const [checkTerms, SetCheckTerms] = useState(false);
  //다른 스택 컴포넌트로 갔다가 돌아오는 상태를 관찰하는 훅
  useFocusEffect(
    useCallback(() => {
      // 스크린이 포커스 될 때 실행될 로직
      setUsername("");
      setPassword("");
    }, [])
  );
  useEffect(() => {
    if (username.includes("-") && password.length > 5 && checkTerms) {
      setLoginValid(true);
    } else {
      setLoginValid(false);
    }
  }, [username, password, checkTerms]);

  const login = async () => {
    setIsLoading(true);
    const { success, data } = await onLogin(username, password);
    if (success) {
      console.log("login success");
    } else {
      console.log("로그인 에라땄음", data);
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
}

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
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
          />
          {loginError?.username ? (
            <Text style={{ color: "red" }}>{loginError.username}</Text>
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
            <Text>🔒초기 비밀번호는 생년월일 8자리입니다.🔒</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              style={{ padding: 0 }}
              checked={checkTerms}
              checkedColor="orange"
              onPress={() => SetCheckTerms(!checkTerms)}
            />
            <Text style={{ fontSize: 15 }}>
              Domtory(돔토리)의 이용 약관에 동의합니다.
            </Text>
          </View>
          <Text
            onPress={() =>
              openBrowserAsync(
                "https://luxurious-share-af6.notion.site/9ed580ee5cc242cab12a1131a9da8b97?pvs=4"
              )
            }
            style={{ textAlign: "right", color: "orange", fontSize: 15 }}
          >
            이용 약관 보기
          </Text>
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
