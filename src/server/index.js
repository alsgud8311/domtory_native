import axios from "axios";

export const apiBe = axios.create({
  baseURL: `https://api.domtory.site/`,
  timeout: 30_3000,
  withCredentials: true,
});
