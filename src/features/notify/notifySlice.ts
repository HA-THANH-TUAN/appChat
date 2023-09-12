import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../app/store";





interface INotifyState{
    numberNotifyMessage: number,
    isRouteMessage : boolean
}

const initialState : INotifyState= {
    numberNotifyMessage: 0,
    isRouteMessage : false
}

export const notifySlice = createSlice({
    name:"notify",
    initialState,
    reducers:{
        setNotifyNumberMessage: (state, {type, payload}:PayloadAction<number>)=>{
            state.numberNotifyMessage=payload
        },

        setIsRouteMessage :(state, {type, payload}:PayloadAction <boolean>)=>{
            if(state.isRouteMessage !==payload){
                state.isRouteMessage=payload
            }
        }
        ,

        increaseNotifyNumberMessage : (state)=>{
            state.numberNotifyMessage++
        }
    }
})



export const {setNotifyNumberMessage,increaseNotifyNumberMessage,setIsRouteMessage }= notifySlice.actions

export const selectNumberNotifyMessage = (state : RootState)=>state.notify.numberNotifyMessage
export const selectIsRouteMessage = (state : RootState)=>state.notify.isRouteMessage

export default notifySlice.reducer