import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginResponse, userInter } from '../../lib/types/login';


let user: userInter = JSON.parse(localStorage.getItem('user') || '{}');
let token: string = localStorage.getItem('token') || '';

const initialState: LoginResponse = {
  user: user || '',
  token: token || '',
  isLogin: user && token ? true : false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveUserInfo: (
      state,
      action: PayloadAction<{
        token: string;
        user: { username: string };
      }>
    ) => {
      state.user.username = action.payload.user.username;
      state.token = action.payload.token;
      state.isLogin = true;
    },
    deleteUserInfo: (state) => {
      state.user.username = '';
      state.isLogin = false;
      state.token = '';
    },
  },
});

export const { saveUserInfo, deleteUserInfo } = loginSlice.actions; //= connect(dispatch)

export const userInfo = (state: RootState) => state.userInfo; // = connect(state)


export default loginSlice.reducer;
