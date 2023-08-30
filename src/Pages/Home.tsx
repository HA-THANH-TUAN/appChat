import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useAppDispatch } from '../app/hooks';
import { refreshApp as refreshAppAction } from '../features/refreshApp/refreshApp';
export const Home = () => {
  const dispatch= useAppDispatch()
  console.log("refreshAppAction:::",refreshAppAction())
  return (
    <div>
      Home Page
      {/* <EmojiPicker
        lazyLoadEmojis={true}
        onEmojiClick={(e)=>{
          console.log(e)
        }}
      
      /> */}

      <button className='bg-blue-500 px-3 py-1 border text-white'
        onClick={()=>{
          fetch(`http://localhost:3003/authentication/test`, {method:"get", headers:{
            "Content-Type": "application/json"
          }})
          
        }}
      >Test</button>
    </div>
  )
}
