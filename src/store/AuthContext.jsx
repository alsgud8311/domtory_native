import { createContext, useContext, useEffect, useState } from "react";
import { apiBe } from "../server";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    member: {
      id: null,
      email: null,
      nickname: null,
    },
  });

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN);
      const memberString = await SecureStore.getItemAsync(MEMBER);
      const member = memberString ? JSON.parse(memberString) : null;

      if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          accessToken: accessToken,
          refreshToken: refreshToken,
          authenticated: true,
          member: member,
        });
      }
    };
    loadToken();
  }, []);

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
      setAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        authenticated: true,
        member: {
          id: data.id,
          email: data.email,
          nickname: data.nickname,
        },
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      await SecureStore.setItemAsync(ACCESS_TOKEN, data.accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN, data.refreshToken);
      await SecureStore.setItemAsync(MEMBER, data.member);
      return data;
    } catch (error) {
      console.log("signin error:", error);
    }
  };

  const signout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(MEMBER);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: fasle,
      member: null,
    });
  };

  const value = {
    onRegister: signUp,
    onLogin: signin,
    onLogout: signout,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
