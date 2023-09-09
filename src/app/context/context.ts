
import { Socket, io } from "socket.io-client";
import React, { createContext, useContext } from 'react';
export type contextType= {
    socketIO : Socket,
    peerConnection :RTCPeerConnection
    
    // eBellMessage : HTMLAudioElement
}


// class CustomSocket extends net.Socket {
//     auth: string | null = null; // You can change the type of 'auth' as needed
//   }

// const client  = new CustomSocket()
//   client.connect(Number(process.env.REACT_APP_PORT_SOCKET), "http://localhost", () => {
//     console.log('Connected to server on localhost:3003');
//   });
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]};
const host = process.env.REACT_APP_URL_DOMAIN || ""
export const initialContext:contextType = {
    socketIO : io(host,{autoConnect:false}),
    peerConnection : new RTCPeerConnection(configuration)
}



const MyContext = createContext<contextType | undefined>(undefined);

export default MyContext;
