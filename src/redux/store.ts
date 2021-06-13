import { configureStore,ThunkAction,Action } from '@reduxjs/toolkit'
import loginReducer from './reducers/login_reducer'
import menuReducer from './reducers/menu_reducer'

export const store  = configureStore({  // = connect()+combineReducers()
  reducer:{
    userInfo: loginReducer,
    menuTitle: menuReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
