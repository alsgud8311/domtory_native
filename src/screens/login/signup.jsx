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
  ScrollView,
} from "react-native";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";
import { useFocusEffect } from "@react-navigation/native";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [nickname, setNickname] = useState("");
  const [cbhsNum, setCbhsNum] = useState("");
  const { onLogin, onRegister } = useAuth();

  const signup = async () => {
    const signupdata = {
      email: email,
      password: password,
      name: name,
      phoneNumber: phoneNum,
      nickname: nickname,
      birthday: birth,
      dormitorycode: cbhsNum,
    };
    const result = await onRegister(signupdata);
    if (result && result.error) {
      console.log(result);
    }
  };

  //다른 스택 컴포넌트로 갔다가 돌아오는 상태를 관찰하는 훅
  useFocusEffect(
    useCallback(() => {
      // 스크린이 포커스 될 때 실행될 로직
      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setBirth("");
      setCbhsNum("");
      setName("");
      setPhoneNum("");
      setNickname("");
    }, [])
  );

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>돔토리 회원가입</Text>
            <Text style={{ fontSize: 15, marginBottom: 20, fontWeight: 700 }}>
              돔토리는 충북학사생 전용 커뮤니티 서비스입니다.
            </Text>
            <View styles={styles.inputWrapper}>
              <TextInput
                placeholder="이메일"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TextInput
                placeholder="비밀번호"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <TextInput
                placeholder="비밀번호 확인"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => setPasswordCheck(text)}
                value={passwordCheck}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  placeholder="이름"
                  placeholderColor="#c4c3cb"
                  style={styles.signupFormTextInputHalf}
                  secureTextEntry={true}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
                <TextInput
                  placeholder="생일"
                  placeholderColor="#c4c3cb"
                  style={styles.signupFormTextInputHalf}
                  onChangeText={(text) => setBirth(text)}
                  value={birth}
                />
              </View>
              <TextInput
                placeholder="휴대폰번호(-를 제외하고 적어주세요!)"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => setPhoneNum(text)}
                value={phoneNum}
              />
              <TextInput
                placeholder="닉네임"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setNickname(text)}
                value={nickname}
              />
              <TextInput
                placeholder="학사번호"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInputHalf}
                onChangeText={(text) => setCbhsNum(text)}
                value={cbhsNum}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={signup}>
              <Text style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
                회원가입
              </Text>
            </TouchableOpacity>
            <Text>
              ⚠️제출해주신 개인정보는 학사생 신원 확인용으로만 사용됩니다.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
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
  signupFormTextInput: {
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
    marginBottom: 10,
  },
  signupFormTextInputHalf: {
    width: 160,
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
