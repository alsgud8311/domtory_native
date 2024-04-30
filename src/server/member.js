var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios, { Axios } from "axios";
import { apiBe } from ".";
import * as Securestore from "expo-secure-store";
export const signUp = (email, password, name, phoneNumber, nickname, birthday, dormitoryCode) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { data } = yield apiBe.post("/member/signup/", requestData);
        return data;
    }
    catch (error) {
        console.log("signup error: ", error);
    }
});
export const signin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const signinData = { email: email, password: password };
    try {
        const { data } = yield apiBe.post("/member/signin/", signinData);
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
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        yield Securestore.setItemAsync(accessToken, accessToken);
        return data;
    }
    catch (error) {
        console.log("signin error:", error);
    }
});
export const signout = () => __awaiter(void 0, void 0, void 0, function* () { });
