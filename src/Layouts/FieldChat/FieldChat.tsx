import React, { useEffect, useRef } from 'react'

import {IoCallOutline} from "react-icons/io5"
import {MdOutlineKeyboardVoice} from "react-icons/md"
import {FaRegHeart} from "react-icons/fa"
import { PiWarningCircle } from 'react-icons/pi'
import { BsCameraVideo,BsEmojiSmile,BsImage } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useDispatch } from 'react-redux'


import io from 'socket.io-client';
socket= io("http://localhost:3003")


const FieldChat = () => {
  const dispatch =useAppDispatch()

  const [message, setMessage] =React.useState<string>("")
  const [isVisibleSend, setVisibleSend]=React.useState(false)

  const handleOnchangeInput =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const vl=e.target.value
    setMessage(vl)

    setVisibleSend( vl==="" ? false : true )
  
  }

  const counter = useAppSelector((state)=>state.counter.value)



  const refVideoLocal=useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    socket.on('message', message => {
      console.log("tui nhan tin nhan ne",message)
    });

  },[])

  const handleSendMessage = ()=>{
    socket.emit(message)
    
  }
  
  
  return (
    <div className='flex-1 w-full'>
      <section>
        <div className='h-[80px] px-3 border-b flex items-center'>
          <div className='flex items-center flex-1'>
              <div className='flex flex-1 items-center' >
                  <div className='w-11 h-11 bg-slate-600 rounded-[50%]'></div>
                  <div className='ml-2'>
                      <h2 className='font-bold'>Ha Thanh Tuan</h2>
                      {/* <p className='text-xs'>Hoạt động 2 giờ trước counter:{counter} numberIO: {numberIO}  </p> */}
                  </div>
              </div>
              <div className='pl-3'>
                  <ul className='flex'>
                    <li className='mx-2 text-2xl flex justify-center items-center hover:opacity-70 cursor-pointer'><FiPhoneCall/></li>
                    <li className='mx-2 text-3xl flex justify-center items-center hover:opacity-70 cursor-pointer'><BsCameraVideo/></li>
                    <li className='mx-2 text-3xl flex justify-center items-center hover:opacity-70 cursor-pointer'><PiWarningCircle/></li>
                  </ul>
              </div>
          </div>
        </div>
        <div></div>
      </section>
      <section className='h-[calc(100vh-200px)] overflow-y-auto'>

      </section>
      <section>
        <div className='h-[60px]'>
          <div className=' mx-4 h-[45px] border-zinc-300 border rounded-[21px]'>
            <div className='px-[14px] flex h-full'>
              <div className=' flex w-full items-center'>
                <span className='text-2xl '><BsEmojiSmile/></span>
                <div className='flex-1 mx-3'><input className='w-full h-full focus:outline-none' value={message} onChange={handleOnchangeInput} placeholder='Message ...' type="text" /></div>
                <>
                  {
                    !isVisibleSend ? 
                    <ul className='flex'>
                      <li className='text-2xl mx-2'><MdOutlineKeyboardVoice/></li>
                      <li className='text-2xl mx-2'><BsImage/></li>
                      <li className='text-2xl mx-2'><FaRegHeart/></li>
                    </ul>:
                    <button className='text-blue-500 font-semibold cursor-pointer hover:opacity-60 mr-2 ' onClick={handleSendMessage}>Send</button>
                  }
                </>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default FieldChat