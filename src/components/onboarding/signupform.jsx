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
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../store/AuthContext";
import logo from "../../assets/domtory_icon.png";
import { useFocusEffect } from "@react-navigation/native";
import {
  getPhotoPermission,
  pickImage,
} from "../../components/common/imagepicker";
import { FontAwesome } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { signUp } from "../../server/member";

export default function SignupForm({ navigation }) {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [cbhsNum, setCbhsNum] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errormsg, setErrorMsg] = useState({
    phoneNumber: null,
    name: null,
    cbhsNum: null,
    birth: null,
  });
  const [isLoading, setLoading] = useState(false);

  //Formdata 형식으로 회원가입 요청
  const onPressSignup = async () => {
    if (validationCheck()) {
      try {
        const response = await signUp(name, phoneNum, birth, cbhsNum);
        if (response.success) {
          console.log("signup success");
          Alert.alert(
            "회원가입이 완료되었습니다! 승인까지는 하루에서 이틀정도가 소요됩니다 :)"
          );
          navigation.reset({ routes: [{ name: "로그인" }] });
        } else {
          //에러시 메세지 띄우기용 state
          setErrorMsg(response);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "회원가입 중에 오류가 발생했습니다.",
          "다시 시도해 주시겠어요?"
        );
        setLoading(false);
      }
    }
  };
  function validationCheck() {
    const cbhsNumRegex = /^[0-9]{2}-[0-9]{4}$/;
    const phoneRegex = /^[0-9]{11}$/;
    const birthRegex = /^[0-9]{8}$/;

    let valid = true;

    if (!cbhsNumRegex.test(cbhsNum)) {
      setErrorMsg((prev) => ({
        ...prev,
        cbhsNum:
          "유효하지 않은 학사번호입니다. 00-0000의 형식으로 입력해주세요!",
      }));
      valid = false;
    } else {
      setErrorMsg((prev) => ({ ...prev, cbhsNum: null }));
    }

    if (!birthRegex.test(birth)) {
      setErrorMsg((prev) => ({
        ...prev,
        birth: "유효하지 않은 생년월일입니다. YYYYMMDD 형식으로 입력해주세요!",
      }));
      valid = false;
    } else {
      setErrorMsg((prev) => ({ ...prev, birth: null }));
    }

    if (!phoneRegex.test(phoneNum)) {
      setErrorMsg((prev) => ({
        ...prev,
        phoneNumber:
          "유효하지 않은 휴대폰 번호입니다. -를 제외하고 입력해주세요!",
      }));
      valid = false;
    } else {
      setErrorMsg((prev) => ({ ...prev, phoneNumber: null }));
    }

    return valid;
  }

  return (
    <ScrollView
      style={{
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView style={styles.containerView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>돔토리 회원가입</Text>
            <Text style={{ fontSize: 15, fontWeight: 700 }}>
              돔토리는 충북학사생 전용 커뮤니티 서비스입니다.
            </Text>
            <View style={styles.inputWrapper}>
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
                <TextInput
                  spellCheck={false}
                  autoCorrect={false}
                  placeholder="이름"
                  placeholderColor="#c4c3cb"
                  style={styles.signupFormTextInputHalf}
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
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
              {errormsg.name ? (
                <Text style={{ color: "red" }}>{errormsg.name}</Text>
              ) : null}
              {errormsg.cbhsNum ? (
                <Text style={{ color: "red" }}>{errormsg.cbhsNum}</Text>
              ) : null}
              <TextInput
                spellCheck={false}
                autoCorrect={false}
                placeholder="생년월일(YYYYMMDD)"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setBirth(text)}
                value={birth}
                keyboardType="number-pad"
              />
              {errormsg.birth ? (
                <Text style={{ color: "red" }}>{errormsg.birth}</Text>
              ) : null}
              <TextInput
                spellCheck={false}
                autoCorrect={false}
                placeholder="휴대폰번호(-를 제외하고 적어주세요!)"
                placeholderColor="#c4c3cb"
                style={styles.signupFormTextInput}
                onChangeText={(text) => setPhoneNum(text)}
                value={phoneNum}
                keyboardType="number-pad"
              />
              {errormsg.phoneNumber ? (
                <Text style={{ color: "red" }}>{errormsg.phoneNumber}</Text>
              ) : null}
            </View>
            <View style={styles.termWrapper}>
              <Text style={{ color: "gray" }}>
                개인정보 수집 및 이용 동의서 {"\n"}
                {"\n"}
                1. 개인정보의 수집 및 이용 목적 {"\n"}
                돔토리의 회원 가입 및 관리 목적으로 아래와 같은 개인정보를 수집
                및 이용합니다. 수집된 개인정보는 기숙사 측과 대조하여 정확한
                학사생 인증을 위해 사용됩니다. {"\n"}
                {"\n"}
                2. 수집하는 개인정보 항목{"\n"}
                학사번호, 전화번호, 이름, 생년월일 {"\n"}
                {"\n"}
                3. 개인정보의 보유 및 이용 기간 {"\n"}
                수집된 개인정보는 돔토리 회원 탈퇴 시나 돔토리 서비스 종료 후
                즉시 파기되며, 관련 법령에 따라 일정 기간 보관이 요구되는 경우
                해당 기간 동안 안전하게 보관됩니다. {"\n"}
                {"\n"}
                4. 개인정보 제3자 제공에 대한 사항 {"\n"}수집된 개인정보는
                기숙사 관리 측과 정보 대조를 위해 제공될 수 있으며, 그 외의
                목적으로는 제3자에게 제공되지 않습니다.{"\n"}
                {"\n"}
                5. 동의를 거부할 권리{"\n"} 및 동의 거부 시 불이익 귀하는
                개인정보 제공에 대한 동의를 거부할 권리가 있으며, 동의 거부 시
                기숙사 프로젝트에 회원 가입이 제한될 수 있습니다.{"\n"}
              </Text>
              <CheckBox
                checked={termsChecked}
                onPress={() => setTermsChecked(!termsChecked)}
                checkedColor="orange"
                title={
                  "본인은 상기 내용을 충분히 이해하였으며, 이에 따라 개인정보 제공에 동의합니다."
                }
              />
            </View>
            {isLoading ? (
              <View style={styles.loginButton}>
                <ActivityIndicator color="lemonchiffon" />
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  !(birth && name && cbhsNum && phoneNum && termsChecked)
                    ? styles.disabledButton // 버튼이 비활성화된 경우의 스타일
                    : {},
                ]}
                onPress={onPressSignup}
                // 필드가 채워져야만 버튼 활성화
                disabled={
                  !(name && cbhsNum && phoneNum && birth && termsChecked)
                }
              >
                <Text style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
                  회원가입
                </Text>
              </TouchableOpacity>
            )}
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
    marginBottom: 70,
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
    padding: 20,
    textAlign: "center",
    flexDirection: "column",
    gap: 5,
  },
  signupFormTextInput: {
    width: "100%",
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
  termWrapper: {
    padding: 20,
    paddingBottom: 0,
  },
  signupFormTextInputHalf: {
    width: "45%",
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
