import axios from "axios";

import { useAuth } from "../store/AuthContext";

export const apiBe = axios.create({
  baseURL: `https://api.domtory.site/`,
  timeout: 30_3000,
  withCredentials: true,
});
