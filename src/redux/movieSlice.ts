import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { increment } from './counterSlice'

export interface movieArr {
  shortDescription: string
  finalPrice: number
  productId: number
  imageList: Array<string>
}
export interface movieSliceInter {
  list: Array<movieArr>
  total: number
}
export const initialState: movieSliceInter = {
  list: [],
  total: 0
}
// 被出发后会有三个状态 pending fulfilled rejected
const fetchCount = () => fetch('https://api.buyanz.com/api/v1/catalogue/product/3596/summary').then((res) => res.json())

export const incrementAsync = createAsyncThunk('movie/fetchData', async () => {
  const response = await fetchCount()
  // The value we return becomes the `fulfilled` action payload
  return response
})

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadDataEnd(state, action: PayloadAction<[]>) {
      state.list = action.payload
      state.total = action.payload.length
    }
  },
  //可以额外的出发其他slice中的数据关联改变
  extraReducers: (build) => {
    build
      .addCase(increment, (state, action) => {
        // state.list.push(1)
        state.list.push({ shortDescription: '411', finalPrice: 1, productId: 2, imageList: ['11', '11'] })
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.list.push(action.payload.data)
      })
  }
})

export const { loadDataEnd } = movieSlice.actions
//export const selectCount = (state:RootState)=>state.counter

export default movieSlice.reducer
