import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useAppDispatch } from '../app/hooks/useCustomReduxTookit';
import { refreshApp as refreshAppAction } from '../features/refreshApp/refreshApp';
import { Test } from '../Components/Test';
export const Home = () => {
  const dispatch= useAppDispatch()
  console.log("refreshAppAction:::",refreshAppAction())
  return (
    <div>
      <Test/>
    </div>
  )
}
