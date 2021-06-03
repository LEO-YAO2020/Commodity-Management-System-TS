import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import movieSlice from './movieSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    movie:movieSlice
  }
})


export type MovieDispatch = typeof store.dispatch
export type MovieRootState = ReturnType<typeof store.getState>
//export default createStore(reducer)
