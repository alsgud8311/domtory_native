import { createContext, useContext, useEffect, useState } from "react";
import { apiBe } from "../server";
import * as SecureStore from "expo-secure-store";
import { requestUserPermission } from "../utils/firebase/firebaseSetting";
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
    const loadToken = async () => {
      const accessToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
      const refreshToken = await SecureStore.getItemAsync("REFRESH_TOKEN");
      const pushToken = await SecureStore.getItemAsync("PUSH_TOKEN");
      const username = await SecureStore.getItemAsync("USERNAME");
      const name = await SecureStore.getItemAsync("NAME");
      const id = await SecureStore.getItemAsync("ID");
      const isStaff = await SecureStore.getItemAsync("STAFF");
      const pushTokenActive = await SecureStore.getItemAsync(
        "PUSHTOKEN_ACTIVE"
      );

      if (accessToken) {
        apiBe.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
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
    };
    loadToken();
  }, []);

  const signUp = async (formdata) => {
    try {
      const response = await apiBe.post("/member/signup/", formdata, {
        headers: { "content-type": "multipart/form-data" },
      });
      return { success: true };
    } catch (error) {
      if (error.response && error.response.data) {
        return { success: false, data: error.response.data };
      } else {
        console.error(error);
      }
    }
  };

  const signin = async (username, password) => {
    const signinData = { username: username, password: password };

    try {
      const { data } = await apiBe.post("/member/signin/", signinData);
      console.log(data);
      apiBe.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      const { AuthorizationSuccess } = await requestUserPermission();
      if (AuthorizationSuccess) {
        const token = await messaging().getToken();
        setAuthState({ pushToken: token });
        await SecureStore.setItemAsync("PUSH_TOKEN", token);
        if (token) {
          console.log("Push Token: ", token);
          try {
            const data = {
              pushToken: token,
            };
            await apiBe.post("/push/token/", data);
            await SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "YES");
          } catch (error) {
            console.log("Sending Push Token error", error);
          }
        } else {
          console.log("getToken Failed");
        }
      } else {
        setAuthState({ pushToken: null, pushTokenActive: "NO" });
        await SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "NO");
      }

      setAuthState((prevState) => ({
        ...prevState,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        authenticated: true,
        username: data.member.username,
        name: data.member.name,
        id: data.member.id.toString(),
      }));

      if (data.member.is_staff) {
        setAuthState((prev) => ({
          ...prev,
          staff: "YES",
        }));
      } else {
        setAuthState((prev) => ({
          ...prev,
          staff: "NO",
        }));
      }

      await SecureStore.setItemAsync("ACCESS_TOKEN", data.accessToken);
      await SecureStore.setItemAsync("REFRESH_TOKEN", data.refreshToken);
      await SecureStore.setItemAsync("USERNAME", data.member.username);
      await SecureStore.setItemAsync("NAME", data.member.name);
      await SecureStore.setItemAsync("ID", data.member.id.toString());
      if (data.member.isStaff) {
        await SecureStore.setItemAsync("STAFF", "YES");
      } else {
        await SecureStore.setItemAsync("STAFF", "NO");
      }
      return { success: true, data: data };
    } catch (error) {
      return { success: false, data: error.response.data };
    }
  };

  const signout = async () => {
    try {
      const pushToken = await SecureStore.getItemAsync("PUSH_TOKEN");
      await apiBe.post("/push/token/invalid/", {
        pushToken: pushToken,
      });
      await SecureStore.deleteItemAsync("ACCESS_TOKEN");
      await SecureStore.deleteItemAsync("REFRESH_TOKEN");
      await SecureStore.deleteItemAsync("PUSH_TOKEN");
      await SecureStore.deleteItemAsync("USERNAME");
      await SecureStore.deleteItemAsync("NAME");
      await SecureStore.deleteItemAsync("ID");
      await SecureStore.deleteItemAsync("STAFF");
      await SecureStore.deleteItemAsync("PUSHTOKEN_ACTIVE");
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
    } catch (error) {
      await SecureStore.deleteItemAsync("ACCESS_TOKEN");
      await SecureStore.deleteItemAsync("REFRESH_TOKEN");
      await SecureStore.deleteItemAsync("PUSH_TOKEN");
      await SecureStore.deleteItemAsync("USERNAME");
      await SecureStore.deleteItemAsync("NAME");
      await SecureStore.deleteItemAsync("ID");
      await SecureStore.deleteItemAsync("STAFF");
      await SecureStore.deleteItemAsync("PUSHTOKEN_ACTIVE");
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
  };

  const changePassword = async (oldPassword, newPassword) => {
    const data = { oldPassword: oldPassword, newPassword: newPassword };
    try {
      const response = await apiBe.post("/member/password/change/", data);
      return { success: true, data: response.data };
    } catch (error) {
      console.log(error.response.data);
      return { success: false, data: error.response.data };
    }
  };

  const withdrawal = async () => {
    try {
      const response = await apiBe.post("/member/withdrawal/");
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: error.response.data };
    }
  };

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
