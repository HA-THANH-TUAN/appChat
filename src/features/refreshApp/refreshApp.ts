import {createSlice} from "@reduxjs/toolkit"



interface IRefreshApp {
    stateRefresh : boolean
}

const initialState : IRefreshApp ={
    stateRefresh:true
}

export const refreshAppSlice = createSlice({
    name:"refreshApp",
    initialState,
    reducers: {
        refreshApp:(state)=>{
            console.log("oke reducer ")
            state.stateRefresh=!state.stateRefresh
        }
    }
}) 

export const {refreshApp}=refreshAppSlice.actions

export default refreshAppSlice.reducer