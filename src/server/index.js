import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../store/AuthContext";

export const apiBe = axios.create({
  baseURL: `https://api.domtory.site/`,
  timeout: 30_3000,
  withCredentials: true,
});

apiBe.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    const { onrefresh } = useAuth();
    if (error.response?.status === 401 && !error_config_retry) {
      error_config_retry = true;
      try {
        await onrefresh();
        return axios(error.config);
      } catch (error) {
        console.error("토큰 재발급 실패: ", error);
      }
    }
  }
);
