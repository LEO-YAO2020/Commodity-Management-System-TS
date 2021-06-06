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

export interface LoginResponse {
  user: {
    username: string;
  };
  token: string;
  isLogin: boolean;
}

export type LoginType = LoginInter;
