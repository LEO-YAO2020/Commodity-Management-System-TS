import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoginResponse } from '../../lib/types/login';

export type LoginResType = LoginResponse;


let user = JSON.parse(localStorage.getItem('user') || '{}');
let token = localStorage.getItem('token');

const initialState: LoginResType = {
  user: user || '',
  token: token || '',
  isLogin: user && token ? true : false,
};

export const testSlice = createSlice({
  name: 'test',
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
    deleteUserInfo:(state)=>{
      state.user.username = ''
      state.isLogin=false
      state.token=''
    }
  },
});

export const { saveUserInfo,deleteUserInfo } = testSlice.actions;

export const userInfo = (state: RootState) => state.userInfo; // = connect()

export default testSlice.reducer;
