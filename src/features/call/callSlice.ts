import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../app/store";


interface IStateCall{
    hasSignalCalling : boolean,
} 

const initialState: IStateCall = {
    hasSignalCalling:false
}


export const callSlice = createSlice ({
    name:"call",
    initialState,
    reducers:{
        tooglePopUpNotifyReceiveCall : (state, {payload}:PayloadAction<boolean>)=>{
            state.hasSignalCalling=payload
        }
    }
    
})

export const {tooglePopUpNotifyReceiveCall}=callSlice.actions

export const selectHasSignalCall = (state:RootState)=>state.call.hasSignalCalling

export default callSlice.reducer
