import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../store/AuthContext";

export const apiBe = axios.create({
  baseURL: `https://api.domtory.site/`,
  timeout: 30_3000,
  withCredentials: true,
});
