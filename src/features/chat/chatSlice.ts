import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/Types/user.type";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../app/store";





interface IChatState{
    receiver:IUser | undefined
}

const initialState : IChatState= {
    receiver:undefined
}

export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        receiver: (state, {type, payload}:PayloadAction<IUser>)=>{
            state.receiver=payload
        }
    }
})



export const {receiver}= chatSlice.actions

export const selectReceiver = (state : RootState)=>state.chat.receiver

export default chatSlice.reducer