
import { Socket, io } from "socket.io-client";
import React, { createContext, useContext } from 'react';



export interface contextType {
    socketIO : Socket,
    // eBellMessage : HTMLAudioElement
}


// class CustomSocket extends net.Socket {
//     auth: string | null = null; // You can change the type of 'auth' as needed
//   }

// const client  = new CustomSocket()
//   client.connect(Number(process.env.REACT_APP_PORT_SOCKET), "http://localhost", () => {
//     console.log('Connected to server on localhost:3003');
//   });

export const initialContext:contextType = {
    socketIO : io("http://localhost:3003"),
    // eBellMessage : new Audio(process.env.PUBLIC_URL + '/audio/MessengerBell.mp3')
}
// MyContext.tsx


const MyContext = createContext<contextType | undefined>(undefined);

export default MyContext;
