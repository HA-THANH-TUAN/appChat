import React from 'react'
import Navbar from '../Navbar/Navbar'
import {io} from "socket.io-client"

interface IMainPrivate{
    

}

const socket= io("http://localhost:3003")

// socket.on("session", ({ sessionID, userID }) => {
//   // attach the session ID to the next reconnection attempts
//   socket.auth = { sessionID };
//   // store it in the localStorage
//   localStorage.setItem("sessionID", sessionID);
//   // save the ID of the user
//   socket.userID = userID;
// });

const  created =()=>  {
  const sessionID = localStorage.getItem("sessionID");
  console.log("run===>::: create", sessionID)
  
  if (sessionID) {
    socket.auth = { sessionID };
    socket.connect();
  }
} 

created()

const MainPrivate :React.FC<any> = ({children}) => {
  return (
    <div className='flex'>
        <Navbar></Navbar>
        {children}

    </div>
  )
}

export default MainPrivate