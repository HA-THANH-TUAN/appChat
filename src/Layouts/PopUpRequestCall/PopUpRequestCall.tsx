import React,{useEffect,useContext,FC,useState} from 'react'
import {IoClose} from "react-icons/io5"
import { IoCallSharp } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../app/hooks/useCustomReduxTookit'
import { selectHasSignalCall, tooglePopUpNotifyReceiveCall } from '../../features/call/callSlice'
import MyContext from '../../app/context/context'
import { IRequestCall } from '../../Pages/Private'
import { useNavigate } from 'react-router-dom'



interface IPopUpRequestCall {
    dataRequestCall:IRequestCall
}


const PopUpRequestCall: FC<IPopUpRequestCall> = ({dataRequestCall}) => {
    const ctx= useContext(MyContext) 
    const socketIO = ctx?.socketIO
  useEffect(() => {
    // const audio = new Audio(process.env.PUBLIC_URL + '/audio/FacebookMessengerCall.mp3')
    // audio.loop=true
    // audio.autofocus=true
    // audio.play()
  
    // return () => {
        //   second
        // }

   

    
    }, [])


    const nav= useNavigate()
    
    
  
  const signalCalling =useAppSelector(selectHasSignalCall)
  const dispatch= useAppDispatch()
  const handleRejectCall =  ()=>{
    dispatch(tooglePopUpNotifyReceiveCall(false))
    // ----- send message to server to save massage missed call
    if(socketIO){
        socketIO.emit("rejectCalling", {roomId: dataRequestCall.roomId,socketCaller:dataRequestCall.socketCaller})
    }
    console.log("handleRejectCall:::",handleRejectCall)
    
}
const hanldeAcceptCall =  ()=>{
    if(socketIO){
        window.open(`http://localhost:3000/call?hasVideo=false&roomId=${dataRequestCall.roomId}&conversationStatus=start`)
        socketIO.emit("acceptCalling", dataRequestCall)
        
    }
      // ----- send message to server to save massage accept call
    console.log("hanldeAcceptCall:::",hanldeAcceptCall)
  }
  return (
    <>
    {
        signalCalling &&
        <div className='w-full h-screen fixed top-0 right-0 z-30 '>
            <section className='relative h-full flex justify-center items-center'>
                <section className='bg-[#666666af] w-full h-full absolute'></section>
                <section className='max-w-[350px] bg-white rounded-xl px-3 py-5 relative'>
                        <button className='w-8 h-8 bg-[#d2d2d2] flex justify-center items-center text-xl rounded-[50%] absolute right-0 mx-5'
                            onClick={handleRejectCall}
                        ><IoClose/></button>
                        <div className='flex flex-col items-center mb-4'>
                            <span className='w-16 h-16 rounded-[50%] bg-[#0000ff98] border-2 border-zinc-400  inline-block mb-7'></span>
                            <h2 className='font-bold text-xl text-center px-6'>Thanh Tuan đang gọi cho bạn</h2>
                        </div>
                        <p className='text-center mb-10'>Cuộc gọi sẽ bắt đầu ngày khi bạn chấp nhận</p>
                        <ul className='flex justify-evenly '>
                            <li className='flex flex-col justify-end items-center'>
                                <button className='w-10 h-10 rounded-[50%] bg-red-500 text-2xl text-white flex justify-center items-center mb-2 hover:opacity-70'
                                    onClick={handleRejectCall}
                                ><IoClose/></button><span className='text-sm font-semibold '>Từ chối</span>
                            </li>
                            <li className='flex flex-col justify-end items-center'>
                                <button className='w-10 h-10 rounded-[50%] bg-green-500 text-lg text-white flex justify-center items-center mb-2 hover:opacity-70'
                                    onClick={hanldeAcceptCall}
                                ><IoCallSharp/></button><span className='text-sm font-semibold '>Chấp nhận</span>
                            </li>
                        </ul>
                </section>
            </section>
        </div>
    }
    </>
  )
}

export default PopUpRequestCall