import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  title:''
};

export const menuSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveTitle: (state, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
  },
});

export const { saveTitle } = menuSlice.actions; //= connect(dispatch)

export const menuTitle = (state: RootState) => state.menuTitle.title; // = connect(state)

export default menuSlice.reducer;
