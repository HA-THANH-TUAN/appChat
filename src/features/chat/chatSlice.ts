import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/Types/user.type";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../../app/store";





interface IChatState{
    conversationId ?: string,
    triggerEndScroll : boolean
}

const initialState : IChatState= {
    conversationId : undefined,
    triggerEndScroll : true
}

export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setCoversationId: (state, {type, payload}:PayloadAction<string>)=>{
            state.conversationId=payload
        },
        setTriggerEndScroll: (state)=>{
            state.triggerEndScroll=!state.triggerEndScroll
        }
    }
})



export const {setCoversationId ,setTriggerEndScroll}= chatSlice.actions

export const selectConversationId = (state : RootState)=>state.chat.conversationId
export const selectTriggerEndScroll = (state : RootState)=>state.chat.triggerEndScroll

export default chatSlice.reducer