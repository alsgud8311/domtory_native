import axios, { Axios } from "axios";
import { apiBe } from ".";
import * as Securestore from "expo-secure-store";
export const signUp = async (name, phone_number, birthday, dormitory_code) => {
  await apiBe.post("/member/signup/", {
    name,
    phone_number,
    birthday,
    dormitory_code,
  });
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

export const getUserInfo = async () => {
  try {
    const userInfo = await apiBe.get(`/member/info/`);
    return userInfo.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return new Error("오류가 발생했습니다. 다시 시도해 주시겠어요?");
    }
  }
};
