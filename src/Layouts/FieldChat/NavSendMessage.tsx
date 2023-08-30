import React, { useState } from 'react'
import { BsEmojiSmile, BsImage } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineKeyboardVoice } from 'react-icons/md'
import { socket } from '../MainPrivate/MainPrivate'

interface INavSendMessage{
}

const NavSendMessage:React.FC<INavSendMessage> = () => {
    const [visibleSend, setVisibleSend]= useState<boolean>()
    const [message, setMessage] =useState<string>()

    const handleOnchangeInput =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const vl=e.target.value
        setMessage(vl)
        setVisibleSend( vl==="" ? false : true )
      
      }

    const handleSendMessage:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
      const dtLocalS= localStorage.getItem("user")
      if(dtLocalS!==null){
        const user = JSON.parse(dtLocalS)
        socket.timeout(6000).emit(
          
          "hello",
          {
            name:user.name,
            content: message
          },
          
          "email"
          ,
          {
            emaik:user.emaik,
            content: message
          },
        )
      }
    }

    return (
        <section className='h-[60px] flex'>
            <div className='flex px-4  flex-1 items-center'>
              <div className='h-[45px] flex-1 border-zinc-300 border-2 rounded-[21px] '>
                <div className='px-[14px] flex h-full'>
                  <div className=' flex w-full items-center'>
                    <span className='text-2xl '><BsEmojiSmile/></span>
                    <div className='flex-1 mx-3'><input className='w-full h-full focus:outline-none' value={message} onChange={handleOnchangeInput} placeholder='Message ...' type="text" /></div>
                    <>
                      {
                        !visibleSend ? 
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
  )
}

export default NavSendMessage