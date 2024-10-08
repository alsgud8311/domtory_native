import React, { createContext, useContext, useEffect, useState } from "react";
import { apiBe } from "../server";
import * as SecureStore from "expo-secure-store";
import {
  checkApplticationPermission,
  requestUserPermission,
} from "../utils/firebase/firebaseSetting";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import {
  CustomError,
  DataReturn,
  ErrorReturn,
  ProviderType,
  UserInfo,
} from "./authmodel";

//AuthContext + SecureStore을 이용한 로그인
const AuthContext = createContext<ProviderType | undefined>(undefined);

export interface SignUpReturn {
  success: Boolean;
  data?: Object;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<UserInfo>({
    accessToken: null,
    refreshToken: null,
    pushToken: null,
    authenticated: false,
    staff: null,
    username: null,
    name: null,
    id: null,
    dorm: null,
    pushTokenActive: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
      const refreshToken = await SecureStore.getItemAsync("REFRESH_TOKEN");
      const pushToken = await SecureStore.getItemAsync("PUSH_TOKEN");
      const username = await SecureStore.getItemAsync("USERNAME");
      const dorm = await SecureStore.getItemAsync("DORM");
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
          dorm: dorm,
          id: id,
          staff: isStaff,
          pushTokenActive: pushTokenActive,
        });
      }
    };
    loadToken();
  }, []);

  const signin = async (
    username: string,
    password: string,
    dormitory: boolean
  ) => {
    const signinData = {
      dormitory_code: username,
      password: password,
      dorm: dormitory ? "WEST" : "EAST",
    };

    try {
      const { data } = await apiBe.post("/member/signin/", signinData);
      console.log(data);
      apiBe.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
      checkApplticationPermission();
      const { AuthorizationSuccess } = await requestUserPermission();
      if (AuthorizationSuccess) {
        const token = await messaging().getToken();
        if (token) {
          setAuthState((prev) => ({ ...prev, pushToken: token }));
          await SecureStore.setItemAsync("PUSH_TOKEN", token);
          try {
            const data = {
              pushToken: token,
            };
            await apiBe.post("/push/token/", data);
            setAuthState((prev) => ({ ...prev, pushTokenActive: "YES" }));
            await SecureStore.setItemAsync("PUSHTOKEN_ACTIVE", "YES");
          } catch (error) {
            console.log("Sending Push Token error", error);
          }
          const dormInfo = await refreshInfo();
          setAuthState((prev) => ({ ...prev, dorm: dormInfo }));
          await SecureStore.setItemAsync(
            "PUSHTOKEN_ACTIVE",
            dormInfo.toString()
          );
        } else {
          console.log("getToken Failed");
        }
      } else {
        setAuthState((prev) => ({
          ...prev,
          pushToken: null,
          pushTokenActive: "NO",
        }));
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
        await SecureStore.setItemAsync("STAFF", "YES");
      } else {
        setAuthState((prev) => ({
          ...prev,
          staff: "NO",
        }));
        await SecureStore.setItemAsync("STAFF", "NO");
      }

      await SecureStore.setItemAsync("ACCESS_TOKEN", data.accessToken);
      await SecureStore.setItemAsync("REFRESH_TOKEN", data.refreshToken);
      await SecureStore.setItemAsync("USERNAME", data.member.username);
      await SecureStore.setItemAsync("NAME", data.member.name);
      await SecureStore.setItemAsync("ID", data.member.id.toString());
      return { success: true, data: data };
    } catch (error) {
      return { success: false, data: error.response.data };
    }
  };

  const refreshInfo = async () => {
    try {
      const { data } = await apiBe.get("/member/info/");
      await SecureStore.setItemAsync("DORM", data.dorm.toString());
      return data.dorm.toString();
    } catch (error) {
      console.log(error.response.data);
      Alert.alert("유저 정보를 불러오는데 실패했습니다.");
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
        name: null,
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
        name: null,
        id: null,
        staff: null,
        pushTokenActive: null,
      });
      Alert.alert("로그아웃 되었습니다.", "다음에 또 만나요!");
      return { success: true };
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const data = { oldPassword: oldPassword, newPassword: newPassword };
    try {
      const response = await apiBe.post("/member/password/change/", data);
      return { success: true, data: response.data };
    } catch (error) {
      const customErr = error as CustomError;
      return { success: false, data: customErr.response?.data };
    }
  };

  const withdrawal = async () => {
    try {
      const response = await apiBe.post("/member/withdrawal/");
      return { success: true, data: response.data };
    } catch (error) {
      const customErr = error as CustomError;
      return { success: false, data: customErr.response?.data };
    }
  };

  const value: ProviderType = {
    onLogin: signin,
    onLogout: signout,
    onPasswordChange: changePassword,
    onWithdrawal: withdrawal,
    setAuthState: setAuthState,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const defaultAuthState = {
  authState: {
    accessToken: null,
    refreshToken: null,
    pushToken: null,
    authenticated: false,
    staff: null,
    username: null,
    dorm: null,
    name: null,
    id: null,
    pushTokenActive: null,
  },
  setAuthState: () => {}, // 기본값 또는 함수 구현
};

export function useAuth<T>(): T {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context as T;
}
