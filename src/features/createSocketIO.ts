import { createAction, createReducer } from "@reduxjs/toolkit"
import { io } from "socket.io-client"

const initial : any = ""
export const createSocketIO=createAction<undefined>("createSocketIO")

export default createReducer(initial, (builder)=>{
    // builder.addCase(createSocketIO, ()=>{
    //     const socket= io(" http://localhost:3003")
    //     return socket
    // })

    // .addDefaultCase((state)=>{
    //     console.log(",,,,,,")
    //     return state
    // })

})