import { Dispatch, SetStateAction } from "react";
import { SignUpReturn } from "./AuthContext";

export type UserInfo = {
  accessToken?: string | null;
  refreshToken?: string | null;
  pushToken?: string | null;
  authenticated?: boolean | null;
  staff?: string | null;
  username?: string | null;
  name?: string | null;
  id?: string | null;
  dorm?: string | null;
  pushTokenActive?: string | null;
};

export interface CustomError extends Error {
  response?: {
    data: any;
    status: number;
    headers: string;
  };
}

export type SimpleReturn = {
  success: boolean;
};

export type DataReturn = {
  success: boolean;
  data: object;
};

export type ErrorReturn = SimpleReturn & {
  data: CustomError;
};

export type ProviderType = {
  onLogin(username: string, password: string): Promise<DataReturn>;
  onLogout(): Promise<SimpleReturn>;
  onPasswordChange(
    oldPassword: string,
    newPassword: string
  ): Promise<DataReturn | ErrorReturn>;
  onWithdrawal(): Promise<DataReturn | ErrorReturn>;
  setAuthState: Dispatch<SetStateAction<ProviderType["authState"]>>; // 여기서 함수 호출을 제거했습니다
  authState: {
    accessToken?: string | null;
    refreshToken?: string | null;
    pushToken?: string | null;
    authenticated?: boolean | null;
    staff?: string | null;
    username?: string | null;
    name?: string | null;
    id?: string | null;
    pushTokenActive?: string | null;
  };
};
