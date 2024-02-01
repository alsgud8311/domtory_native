import axios from "axios";

//axios 인스턴스 생성
export const apiBe = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
  timeout: 30_3000,
  withCredentials: true,
});
