import { createContext, useContext, useEffect, useState } from "react";
import { apiBe } from "../server";
import * as SecureStore from "expo-secure-store";
import { requestUserPermission } from "../utils/firebase/firebaseSetting";
import messaging from "@react-native-firebase/messaging";

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
    member: {
      id: null,
      email: null,
      nickname: null,
    },
  });

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
      const refreshToken = await SecureStore.getItemAsync("REFRESH_TOKEN");
      const pushToken = await SecureStore.getItemAsync("PUSH_TOKEN");
      const memberString = await SecureStore.getItemAsync("MEMBER");
      const member = memberString ? JSON.parse(memberString) : null;

      if (accessToken) {
        apiBe.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        setAuthState({
          accessToken: accessToken,
          refreshToken: refreshToken,
          pushToken: pushToken,
          authenticated: true,
          member: member,
        });
      }
    };
    loadToken();
  }, [authState]);

  const signUp = async (formdata) => {
    try {
      const { data } = await apiBe.post("/member/signup/", formdata);
      return { success: true, data: data };
    } catch (error) {
      return { success: false, data: error.response.data };
    }
  };

  const signin = async (email, password) => {
    const signinData = { email: email, password: password };

    try {
      const { data } = await apiBe.post("/member/signin/", signinData);
      apiBe.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      const { AuthorizationSuccess } = await requestUserPermission();
      if (AuthorizationSuccess) {
        const token = await messaging().getToken();
        if (token) {
          console.log("Push Token: ", token);
          try {
            const data = {
              pushToken: token,
            };
            await apiBe.post("/push/token/", data);
            setAuthState({ pushToken: token });
            await SecureStore.setItemAsync(PUSH_TOKEN, token);
            console.log("Sending Push Token Success");
          } catch (error) {
            console.log("Sending Push Token error", error);
          }
        } else {
          console.log("getToken Failed");
        }
      }

      setAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        authenticated: true,
        member: {
          id: data.member.id,
          email: data.member.email,
          nickname: data.member.nickname,
        },
      });

      await SecureStore.setItemAsync(ACCESS_TOKEN, data.accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN, data.refreshToken);
      await SecureStore.setItemAsync(MEMBER, data.member);
      return { success: true, data: data };
    } catch (error) {
      return { success: false, data: error.response.data };
    }
  };

  const signout = async () => {
    try {
      const pushToken = await SecureStore.getItemAsync("PUSH_TOKEN");
      await apiBe.post("/push/token/invalid/", pushToken);
      await SecureStore.deleteItemAsync("ACCESS_TOKEN");
      await SecureStore.deleteItemAsync("REFRESH_TOKEN");
      await SecureStore.deleteItemAsync("PUSH_TOKEN");
      await SecureStore.deleteItemAsync("MEMBER");
      apiBe.defaults.headers.common["Authorization"] = "";

      setAuthState({
        accessToken: null,
        refreshToken: null,
        pushToken: null,
        authenticated: false,
        member: null,
      });
      console.log("logout");
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
