var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { useAuth } from "../../store/AuthContext";
const PasswordChangeView = () => {
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setoldPasswordCheck] = useState("");
    const [passwordvalid, setPasswordvalid] = useState(true);
    const { onLogout, onPasswordChange } = useAuth();
    const passwordchange = () => __awaiter(void 0, void 0, void 0, function* () {
        const { success, data } = yield onPasswordChange(oldPassword, newPassword);
        if (success) {
            Alert.alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요!");
            yield onLogout();
        }
        else {
            Alert.alert(data.detail);
        }
    });
    useEffect(() => {
        if (newPassword === newPasswordCheck || newPassword.length === 0) {
            setPasswordvalid(true);
        }
        else {
            setPasswordvalid(false);
        }
    }, [newPasswordCheck, newPassword]);
    return (<KeyboardAvoidingView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <TextInput spellCheck={false} autoCorrect={false} secureTextEntry={true} placeholder="기존 비밀번호" placeholderColor="#c4c3cb" style={styles.textInput} onChangeText={(text) => setoldPassword(text)} value={oldPassword}/>
          <View>
            <TextInput secureTextEntry={true} spellCheck={false} autoCorrect={false} placeholder="새 비밀번호" placeholderColor="#c4c3cb" style={styles.textInput} onChangeText={(text) => setNewPassword(text)} value={newPassword}/>
            <Text style={{ paddingLeft: 10 }}>
              비밀번호는 6자리 이상이며, 특수기호가 포함되어야 합니다
            </Text>
          </View>
          <View>
            <TextInput secureTextEntry={true} spellCheck={false} autoCorrect={false} placeholder="새 비밀번호 확인" placeholderColor="#c4c3cb" style={styles.textInput} onChangeText={(text) => setoldPasswordCheck(text)} value={newPasswordCheck}/>
            {!passwordvalid ? (<Text style={{ color: "red", paddingLeft: 10 }}>
                비밀번호가 일치하지 않아요!
              </Text>) : null}
          </View>
          <TouchableOpacity style={[
            styles.button,
            passwordvalid && oldPassword.length > 5 && newPassword.length > 2
                ? {}
                : styles.disabledButton,
        ]} onPress={passwordchange} disabled={!passwordvalid && !oldPassword && newPassword.length > 2}>
            <Text>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>);
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 20,
        marginBottom: 50,
        backgroundColor: "white",
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
        backgroundColor: "#fff",
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    inputWrapper: {
        justifyContent: "center",
        alignItems: "center",
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
export default PasswordChangeView;
