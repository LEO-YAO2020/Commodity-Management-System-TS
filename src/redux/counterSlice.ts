import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MovieRootState } from './store'

export interface CounterState {
  count:number
}

const initialState:CounterState={
  count:0
}

export const counterSlice = createSlice({
  name:'counter',
  initialState,
  reducers:{
    increment:(state)=>{
      state.count +=1
    },
    decrement:(state)=>{
      state.count -=1
    },
    incrementByAmount:(state,action:PayloadAction<{num:number}>)=>{
      state.count+=action.payload.num
    }
  }
})

export const {increment,decrement,incrementByAmount} = counterSlice.actions
export const selectCount = (state:MovieRootState)=>state.counter
export const selectMovieCount = (state:MovieRootState)=>state.movie

export default counterSlice.reducer;
// import { MessageState, MessageAction } from '../lib/model/redux'

// const initialState: MessageState = {
//   count: 1
// }

// export default function countReducer(preState = initialState, action: MessageAction) {
//   console.log('reducer action')
//   let newState: MessageState
//   switch (action.type) {
//     case 'increment':
//       newState = JSON.parse(JSON.stringify(preState))
//       newState.count = newState.count + action.payload.number
//       console.log(newState)
//       return newState
//     case 'decrement':
//       newState = JSON.parse(JSON.stringify(preState))
//       newState.count = newState.count - action.payload.number
//       console.log(newState)
//       return newState
//     case 'addOdd':
//       newState = JSON.parse(JSON.stringify(preState))
//       newState.count = newState.count + action.payload.number
//       console.log(newState)
//       return newState
//     case 'async':
//       newState = JSON.parse(JSON.stringify(preState))
//       newState.count = newState.count + action.payload.number
//       console.log(newState)
//       return newState
//     default:
//       return preState
//   }
// }
