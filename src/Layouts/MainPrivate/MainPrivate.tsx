import React from 'react'
import Navbar from '../Navbar/Navbar'
import {io} from "socket.io-client"
import Cookies from 'js-cookie'
import { useAppSelector } from '../../app/hooks'

interface IMainPrivate{
    

}

export const socket= io("http://localhost:3003")

// socket.on("session", ({ sessionID, userID }) => {
//   // attach the session ID to the next reconnection attempts
//   socket.auth = { sessionID };
//   // store it in the localStorage
//   localStorage.setItem("sessionID", sessionID);
//   // save the ID of the user
//   socket.userID = userID;
// });

const  created =()=>  {
  const access_token= Cookies.get("access_token")  
  if (access_token!==undefined) {
    socket.auth = { access_token };
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