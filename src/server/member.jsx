import axios, { Axios } from "axios";
import { apiBe } from ".";
import * as Securestore from "expo-secure-store";
export const signUp = async (
  email,
  password,
  name,
  phoneNumber,
  nickname,
  birthday,
  dormitoryCode
) => {
  const requestData = {
    email: email,
    password: password,
    name: name,
    phoneNumber: phoneNumber,
    nickname: nickname,
    birthday: birthday,
    dormitoryCode: dormitoryCode,
  };
  try {
    const { data } = await apiBe.post("/member/signup/", requestData);
    return data;
  } catch (error) {
    console.log("signup error: ", error);
  }
};

export const signin = async (email, password) => {
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

    await Securestore.setItemAsync(accessToken, accessToken);
    return data;
  } catch (error) {
    console.log("signin error:", error);
  }
};

export const signout = async () => {};
