import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'
export interface TestState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TestState = {
  value: 0,
  status: 'idle',
};
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    Test1: (state, action: PayloadAction<{ data: number }>) => {
      state.value += action.payload.data;
    },
    Test2: (state, action: PayloadAction<{ data: number }>) => {
      state.value += action.payload.data + 1;
    },
  },
});

export const {Test1,Test2} = testSlice.actions

export const selectValue = (state: RootState) => state;

export default testSlice.reducer