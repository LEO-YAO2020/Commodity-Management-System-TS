import { configureStore,ThunkAction,Action } from '@reduxjs/toolkit'
import testReducer from './reducers/test_reducer'

export const store  = configureStore({
  reducer:testReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
