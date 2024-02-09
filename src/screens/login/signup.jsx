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
  ScrollView,
} from "react-native";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";
import { useFocusEffect } from "@react-navigation/native";
import {
  getPhotoPermission,
  pickImage,
} from "../../components/common/imagepicker";
import { FontAwesome } from "@expo/vector-icons";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [validPasswordCheck, setValidPasswordCheck] = useState(true);
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [nickname, setNickname] = useState("");
  const [cbhsNum, setCbhsNum] = useState("");
  const [cbhsImage, setCbhsImage] = useState(null);
  const [errormsg, setErrorMsg] = useState({
    email: null,
    password: null,
    name: null,
    nickname: null,
  });
  const { onLogin, onRegister } = useAuth();

  const onPressPhoto = async () => {
    const permission = await getPhotoPermission();
    if (!permission) {
      Alert.alert(
        "학사증을 업로드하기 위해서는 사진 접근 권한을 허용해야 합니다"
      );
      return; // Early return if no permission
    }
    const imageData = await pickImage();
    if (!imageData) {
      console.log("Image picking was failed");
      return; // Handle the case where the image picker was cancelled or failed
    }
    setCbhsImage(imageData);
  };

  //Formdata 형식으로 회원가입 요청
  const signup = async () => {
    const birth = new Date().toISOString();
    const signupFormData = new FormData();
    signupFormData.append("email", email);
    signupFormData.append("password", password);
    signupFormData.append("name", name);
    signupFormData.append("phoneNumber", phoneNum);
    signupFormData.append("nickname", nickname);
    signupFormData.append("dormitoryCode", cbhsNum);
    signupFormData.append("dormitoryCard", {
      uri: cbhsImage.uri,
      name: cbhsImage.fileName,
      type: cbhsImage.mimeType,
    });
    signupFormData.append("birthday", birth);
    const { success, data } = await onRegister(signupFormData);
    if (success) {
      console.log("signup success");
      Alert.alert("회원가입이 완료되었습니다! 로그인 해주세요 :)");
      navigation.reset({ routes: [{ name: "로그인" }] });
    } else {
      //에러시 메세지 띄우기용 state
      setErrorMsg(data);
      console.log(errormsg);
    }
  };

  useEffect(() => {
    if (password === passwordCheck) {
      setValidPasswordCheck(true);
    } else {
      setValidPasswordCheck(false);
    }
  }, [passwordCheck]);

  return (
    <ScrollView style={{ width: "100%", backgroundColor: "white" }}>
      <KeyboardAvoidingView style={styles.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>돔토리 회원가입</Text>
            <Text style={{ fontSize: 15, marginBottom: 20, fontWeight: 700 }}>
              돔토리는 충북학사생 전용 커뮤니티 서비스입니다.
            </Text>
            <View styles={styles.inputWrapper}>
              <View
                style={{
                  justifyContent: "center",
                  paddingLeft: 5,
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: 700 }}>가입정보</Text>
              </View>
              <TextInput
                spellCheck={false}
                autoCorrect={false}
                placeholder="이메일"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              {errormsg.email ? (
                <Text style={{ color: "red" }}>{errormsg.email}</Text>
              ) : null}
              <TextInput
                textContentType="oneTimeCode"
                spellCheck={false}
                autoCorrect={false}
                placeholder="비밀번호"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              {errormsg.password ? (
                <Text style={{ color: "red" }}>{errormsg.password}</Text>
              ) : null}
              <TextInput
                textContentType="oneTimeCode"
                spellCheck={false}
                autoCorrect={false}
                placeholder="비밀번호 확인"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                secureTextEntry={true}
                onChangeText={(text) => setPasswordCheck(text)}
                value={passwordCheck}
              />
              {validPasswordCheck ? null : (
                <Text style={{ color: "red" }}>
                  비밀번호와 일치하지 않아요!
                </Text>
              )}
              <View
                style={{
                  justifyContent: "center",
                  marginTop: 20,
                  paddingLeft: 5,
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: 700 }}>학사정보</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <TextInput
                    spellCheck={false}
                    autoCorrect={false}
                    placeholder="이름"
                    placeholderColor="#c4c3cb"
                    style={styles.signupFormTextInputHalf}
                    onChangeText={(text) => setName(text)}
                    value={name}
                  />
                  {errormsg.name ? (
                    <Text style={{ color: "red" }}>{errormsg.name}</Text>
                  ) : null}
                </View>
                <TextInput
                  spellCheck={false}
                  autoCorrect={false}
                  placeholder="학사번호"
                  placeholderColor="#c4c3cb"
                  style={styles.signupFormTextInputHalf}
                  onChangeText={(text) => setCbhsNum(text)}
                  value={cbhsNum}
                  keyboardType="number-pad"
                />
              </View>
              <TextInput
                spellCheck={false}
                autoCorrect={false}
                placeholder="휴대폰번호(-를 제외하고 적어주세요!)"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setPhoneNum(text)}
                value={phoneNum}
              />
              <TextInput
                spellCheck={false}
                autoCorrect={false}
                placeholder="닉네임"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setNickname(text)}
                value={nickname}
              />
              {errormsg.name ? (
                <Text style={{ color: "red" }}>{errormsg.name}</Text>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  paddingLeft: 10,
                  marginTop: 10,
                }}
              >
                <FontAwesome
                  name="photo"
                  size={24}
                  color="black"
                  onPress={onPressPhoto}
                />
                <Text>학사증 사진 업로드</Text>
              </View>
              {cbhsImage ? (
                <Image
                  source={{ uri: cbhsImage.uri }}
                  style={{
                    width: 150,
                    height: 150,
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                />
              ) : (
                <Image
                  source={logo}
                  style={{
                    width: 150,
                    height: 150,
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.loginButton,
                !(
                  email &&
                  password &&
                  validPasswordCheck &&
                  name &&
                  cbhsNum &&
                  cbhsImage &&
                  phoneNum
                )
                  ? styles.disabledButton // 버튼이 비활성화된 경우의 스타일
                  : {},
              ]}
              onPress={signup}
              // 필드가 채워져야만 버튼 활성화
              disabled={
                !(
                  email &&
                  password &&
                  validPasswordCheck &&
                  name &&
                  cbhsNum &&
                  cbhsImage &&
                  phoneNum
                )
              }
            >
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
    marginBottom: 50,
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
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
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
  disabledButton: {
    color: "white",
    backgroundColor: "#eaeaea",
    borderRadius: 15,
    width: 350,
    height: 60,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
