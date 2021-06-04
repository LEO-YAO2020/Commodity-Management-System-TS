import { LoginResponse } from './api';

export type UserInfo = LoginResponse;
export class Storage {
  private key = 'cms';

  setUserInfo(info: UserInfo): void {
    localStorage.setItem(this.key, JSON.stringify(info));
  }

  get userInfo(): UserInfo {
    if (typeof sessionStorage.getItem(this.key) === 'string') {
      return JSON.parse(sessionStorage.getItem(this.key)||'{}') as UserInfo;
    }
    return JSON.parse('{}') as UserInfo;
  }

  get token(): string | null {
    return this.userInfo?.token;
  }

  deleteUserInfo(): void {
    localStorage.removeItem(this.key);
  }
}

export const storage = new Storage();

export default storage;