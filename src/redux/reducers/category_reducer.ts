import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryItems } from '../../lib/types/category';
import { RootState } from '../store';

interface initialStateInter {
  data: CategoryItems[];
}
const initialState: initialStateInter = {
  data: [],
};

export const categorySlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveCategoryList: (state, action: PayloadAction<{ data: CategoryItems[] }>) => {
      state.data = [...action.payload.data];
    },
  },
});

export const { saveCategoryList } = categorySlice.actions; //= connect(dispatch)

export const categoryList = (state: RootState) => state.categoryList.data; // = connect(state)

export default categorySlice.reducer;
