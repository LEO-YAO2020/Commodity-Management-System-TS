import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductListItems } from '../../lib/types/product';
import { RootState } from '../store';


interface initialStateInter {
  data: ProductListItems[];
}
const initialState: initialStateInter = {
  data: [],
};


export const productSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveProList: (state, action: PayloadAction<{ data: [] }>) => {
      state.data = [...action.payload.data]
    },
  },
});

export const { saveProList } = productSlice.actions; //= connect(dispatch)

export const proList = (state: RootState) => state.proList.data; // = connect(state)

export default productSlice.reducer;
