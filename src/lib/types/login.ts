export interface LoginInter {
  status: number;
  msg?: string;
  data: {
    user: {
      username:string
    };
    token: string;
  };
}

export interface userInter {
    username: string;
}

export interface LoginResponse {
  user: userInter;
  token: string;
  isLogin: boolean;
}

export type LoginType = LoginInter;
