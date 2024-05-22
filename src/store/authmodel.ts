export type UserInfo = {
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
