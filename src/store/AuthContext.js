var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createContext, useContext, useEffect, useState } from "react";
import { apiBe } from "../server";
import * as SecureStore from "expo-secure-store";
import { checkApplticationPermission, requestUserPermission, } from "../utils/firebase/firebaseSetting";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
//AuthContext + SecureStore을 이용한 로그인
const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        pushToken: null,
        authenticated: false,
        staff: null,
        username: null,
        name: null,
        id: null,
    });
    useEffect(() => {
        const loadToken = () => __awaiter(void 0, void 0, void 0, function* () {
            const accessToken = yield SecureStore.getItemAsync("ACCESS_TOKEN");
            const refreshToken = yield SecureStore.getItemAsync("REFRESH_TOKEN");
            const pushToken = yield SecureStore.getItemAsync("PUSH_TOKEN");
            const username = yield SecureStore.getItemAsync("USERNAME");
            const name = yield SecureStore.getItemAsync("NAME");
            const id = yield SecureStore.getItemAsync("ID");
            const isStaff = yield SecureStore.getItemAsync("STAFF");
            const pushTokenActive = yield SecureStore.getItemAsync("PUSHTOKEN_ACTIVE");
            if (accessToken) {
                apiBe.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                setAuthState({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    pushToken: pushToken,
                    authenticated: true,
                    username: username,
                    name: name,
                    id: id,
                    staff: isStaff,
                    pushTokenActive: pushTokenActive,
                });
            }
        });
        loadToken();
    }, []);
    const signUp = (formdata) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield apiBe.post("/member/signup/", formdata, {
                headers: { "content-type": "multipart/form-data" },
            });
            return { success: true };
        }
        catch (error) {
            if (error.response && error.response.data) {
                return { success: false, data: error.response.data };
            }
            else {
                console.error(error);
            }
        }
    });
    const signin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        const signinData = { username: username, password: password };
        try {
            const { data } = yield apiBe.post("/member/signin/", signinData);
            console.log(data);
            apiBe.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
            checkApplticationPermission();
            const { AuthorizationSuccess } = yield requestUserPermission();
            if (AuthorizationSuccess) {
                const token = yield messaging().getToken();
                setAuthState({ pushToken: token });
                yield SecureStore.setItemAsync("PUSH_TOKEN", token);
                if (token) {
                    console.log("Push Token: ", token);
                    try {
                        const data = {
                            pushToken: token,
                        };
                        yield apiBe.post("/push/token/", data);
                        yield SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "YES");
                    }
                    catch (error) {
                        console.log("Sending Push Token error", error);
                    }
                }
                else {
                    console.log("getToken Failed");
                }
            }
            else {
                setAuthState({ pushToken: null, pushTokenActive: "NO" });
                yield SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "NO");
            }
            setAuthState((prevState) => (Object.assign(Object.assign({}, prevState), { accessToken: data.accessToken, refreshToken: data.refreshToken, authenticated: true, username: data.member.username, name: data.member.name, id: data.member.id.toString() })));
            if (data.member.is_staff) {
                setAuthState((prev) => (Object.assign(Object.assign({}, prev), { staff: "YES" })));
            }
            else {
                setAuthState((prev) => (Object.assign(Object.assign({}, prev), { staff: "NO" })));
            }
            yield SecureStore.setItemAsync("ACCESS_TOKEN", data.accessToken);
            yield SecureStore.setItemAsync("REFRESH_TOKEN", data.refreshToken);
            yield SecureStore.setItemAsync("USERNAME", data.member.username);
            yield SecureStore.setItemAsync("NAME", data.member.name);
            yield SecureStore.setItemAsync("ID", data.member.id.toString());
            if (data.member.isStaff) {
                yield SecureStore.setItemAsync("STAFF", "YES");
            }
            else {
                yield SecureStore.setItemAsync("STAFF", "NO");
            }
            return { success: true, data: data };
        }
        catch (error) {
            return { success: false, data: error.response.data };
        }
    });
    const signout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pushToken = yield SecureStore.getItemAsync("PUSH_TOKEN");
            yield apiBe.post("/push/token/invalid/", {
                pushToken: pushToken,
            });
            yield SecureStore.deleteItemAsync("ACCESS_TOKEN");
            yield SecureStore.deleteItemAsync("REFRESH_TOKEN");
            yield SecureStore.deleteItemAsync("PUSH_TOKEN");
            yield SecureStore.deleteItemAsync("USERNAME");
            yield SecureStore.deleteItemAsync("NAME");
            yield SecureStore.deleteItemAsync("ID");
            yield SecureStore.deleteItemAsync("STAFF");
            yield SecureStore.deleteItemAsync("PUSHTOKEN_ACTIVE");
            apiBe.defaults.headers.common["Authorization"] = "";
            setAuthState({
                accessToken: null,
                refreshToken: null,
                pushToken: null,
                authenticated: false,
                username: null,
                id: null,
                staff: null,
                pushTokenActive: null,
            });
            Alert.alert("로그아웃 되었습니다.", "다음에 또 만나요!");
            return { success: true };
        }
        catch (error) {
            yield SecureStore.deleteItemAsync("ACCESS_TOKEN");
            yield SecureStore.deleteItemAsync("REFRESH_TOKEN");
            yield SecureStore.deleteItemAsync("PUSH_TOKEN");
            yield SecureStore.deleteItemAsync("USERNAME");
            yield SecureStore.deleteItemAsync("NAME");
            yield SecureStore.deleteItemAsync("ID");
            yield SecureStore.deleteItemAsync("STAFF");
            yield SecureStore.deleteItemAsync("PUSHTOKEN_ACTIVE");
            apiBe.defaults.headers.common["Authorization"] = "";
            setAuthState({
                accessToken: null,
                refreshToken: null,
                pushToken: null,
                authenticated: false,
                username: null,
                id: null,
                staff: null,
                pushTokenActive: null,
            });
            Alert.alert("로그아웃 되었습니다.", "다음에 또 만나요!");
            return { success: true };
        }
    });
    const changePassword = (oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const data = { oldPassword: oldPassword, newPassword: newPassword };
        try {
            const response = yield apiBe.post("/member/password/change/", data);
            return { success: true, data: response.data };
        }
        catch (error) {
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        }
    });
    const withdrawal = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield apiBe.post("/member/withdrawal/");
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, data: error.response.data };
        }
    });
    const value = {
        onRegister: signUp,
        onLogin: signin,
        onLogout: signout,
        onPasswordChange: changePassword,
        onWithdrawal: withdrawal,
        authState: authState,
        setAuthState: setAuthState,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
