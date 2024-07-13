import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../store/AuthContext";
import { useColorStore } from "../../store/colorstore";

const PasswordChangeView = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setoldPasswordCheck] = useState("");
  const [passwordvalid, setPasswordvalid] = useState(true);
  const { onLogout, onPasswordChange } = useAuth();
  const darkmode = useColorStore((state) => state.darkmode);
  const styles = useMemo(() => createStyles(darkmode), [darkmode]);

  const passwordchange = async () => {
    const { success, data } = await onPasswordChange(oldPassword, newPassword);
    if (success) {
      Alert.alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요!");
      await onLogout();
    } else {
      Alert.alert(data.detail);
    }
  };
  useEffect(() => {
    if (newPassword === newPasswordCheck || newPassword.length === 0) {
      setPasswordvalid(true);
    } else {
      setPasswordvalid(false);
    }
  }, [newPasswordCheck, newPassword]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            spellCheck={false}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="기존 비밀번호"
            placeholderTextColor={darkmode ? "gray" : "#c4c3cb"}
            style={styles.textInput}
            onChangeText={(text) => setoldPassword(text)}
            value={oldPassword}
          />
          <View>
            <TextInput
              secureTextEntry={true}
              spellCheck={false}
              autoCorrect={false}
              placeholder="새 비밀번호"
              placeholderTextColor={darkmode ? "gray" : "#c4c3cb"}
              style={styles.textInput}
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
            />
            <Text style={styles.passwordInform}>
              비밀번호는 6자리 이상이며, 특수기호가 포함되어야 합니다
            </Text>
          </View>
          <View>
            <TextInput
              secureTextEntry={true}
              spellCheck={false}
              autoCorrect={false}
              placeholder="새 비밀번호 확인"
              placeholderTextColor={darkmode ? "gray" : "#c4c3cb"}
              style={styles.textInput}
              onChangeText={(text) => setoldPasswordCheck(text)}
              value={newPasswordCheck}
            />
            {!passwordvalid ? (
              <Text style={{ color: "red", paddingLeft: 10 }}>
                비밀번호가 일치하지 않아요!
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              passwordvalid && oldPassword.length > 5 && newPassword.length > 2
                ? {}
                : styles.disabledButton,
            ]}
            onPress={passwordchange}
            disabled={!passwordvalid && !oldPassword && newPassword.length > 2}
          >
            <Text>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const createStyles = (darkmode) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      padding: 20,
      marginBottom: 50,
      backgroundColor: darkmode ? "black" : "white",
    },
    wrapper: {
      width: "100%",
      gap: 20,
    },
    textInput: {
      width: 350,
      height: 60,
      fontSize: 20,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "orange",
      backgroundColor: darkmode ? "black" : "white",
      color: darkmode ? "white" : "black",
      paddingLeft: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    inputWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    passwordInform: {
      color: darkmode ? "gray" : "black",
      paddingLeft: 10,
    },
    disabledButton: {
      color: "white",
      backgroundColor: darkmode ? "gray" : "#eaeaea",
      borderRadius: 15,
      width: 350,
      height: 60,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    button: {
      color: "white",
      backgroundColor: "orange",
      borderRadius: 15,
      width: 350,
      height: 60,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
  });
};
export default PasswordChangeView;
