
import { Socket, io } from "socket.io-client";
import React, { createContext, useContext } from 'react';
import Peer from "peerjs";

export type contextType= {
    socketIO : Socket,
    peerConnection :Peer
    
    // eBellMessage : HTMLAudioElement
}
const host = process.env.REACT_APP_URL_DOMAIN || ""
export const initialContext:contextType = {
    socketIO : io(host),
    peerConnection : new Peer()
}



const MyContext = createContext<contextType | undefined>(undefined);

export default MyContext;
