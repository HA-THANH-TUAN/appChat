import { RootState } from './../../app/store';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import checkAuth, { IcheckAuth } from '../../Utils/checkAuth'

interface IState extends IcheckAuth {
}

const initialState: IState = checkAuth()

const resetState:IState = {
  isLogin:false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, {payload}:PayloadAction<boolean>)=>{
      state.isLogin = payload
    },
    setUserInfor: (state, {payload}:PayloadAction<IState["user"]>)=>{
      state.user=payload
    },
    resetAuth: (state)=>{
      state.isLogin = false
      state.user=undefined
    }
    
  },
})

export const { setIsLogin, setUserInfor,resetAuth } = authSlice.actions
export const selectorIsLogin = (state:RootState)=>state.auth.isLogin
export const selectorUser = (state:RootState)=>state.auth.user

export default authSlice.reducer