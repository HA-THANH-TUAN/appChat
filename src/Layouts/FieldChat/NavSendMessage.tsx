import React, { useState } from 'react'
import { BsEmojiSmile, BsImage } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineKeyboardVoice } from 'react-icons/md'

interface INavSendMessage{
  handleSendMessage?: ()=>void 
  message :string
  handleSetMessage : React.Dispatch<React.SetStateAction<string>>
}

const NavSendMessage:React.FC<INavSendMessage> = ({handleSendMessage , handleSetMessage , message}) => {
    const [visibleSend, setVisibleSend]= useState<boolean>()

    const handleOnchangeInput =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const vl=e.target.value
        handleSetMessage(vl)
        setVisibleSend( vl==="" ? false : true )
    }

    const handleSubmit = (e:React.KeyboardEvent<HTMLInputElement>)=>{
      const isPressEnter = e.key.toLowerCase()==="enter"
      if(message?.length>0 && isPressEnter){
        handleSendMessage?.()
        handleSetMessage("")
      }

    }

    return (
        <section className='h-[60px] flex'>
            <div className='flex px-4  flex-1 items-center'>
              <div className='h-[45px] flex-1 border-zinc-300 border-2 rounded-[21px] '>
                <div className='px-[14px] flex h-full'>
                  <div className=' flex w-full items-center'>
                    <span className='text-2xl '><BsEmojiSmile/></span>
                    <div className='flex-1 mx-3'><input className='w-full h-full focus:outline-none' value={message} onKeyDown={handleSubmit} onChange={handleOnchangeInput} placeholder='Message ...' type="text" /></div>
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