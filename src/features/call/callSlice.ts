import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../app/store";


interface IStateCall{
    hasSignalCalling : boolean,
    isPageCall : boolean
} 

const initialState: IStateCall = {
    hasSignalCalling:false,
    isPageCall : false
}


export const callSlice = createSlice ({
    name:"call",
    initialState,
    reducers:{
        tooglePopUpNotifyReceiveCall : (state, {payload}:PayloadAction<boolean>)=>{
            state.hasSignalCalling=payload
        },
        setIsPageCall : (state, {payload}:PayloadAction<boolean>)=>{
            state.isPageCall=payload
        }
    }
    
})

export const {tooglePopUpNotifyReceiveCall,setIsPageCall}=callSlice.actions

export const selectHasSignalCall = (state:RootState)=>state.call.hasSignalCalling
export const selectIsPageCall = (state:RootState)=>state.call.isPageCall

export default callSlice.reducer
