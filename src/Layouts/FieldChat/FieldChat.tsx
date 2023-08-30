import React, { useEffect, useRef } from 'react'


// import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { useDispatch } from 'react-redux'
import NavMessage from './NavMessage'
import AreaMessage from './AreaMessage'
import NavSendMessage from './NavSendMessage'
import { useAppSelector } from '../../app/hooks'
import { selectReceiver } from '../../features/chat/chatSlice'



const FieldChat = () => {
  const dataReceiver = useAppSelector(selectReceiver)
  console.log("selectReceiver::::",selectReceiver)

  return (
    <div className='flex-1 w-full'>
      <div className='flex flex-col h-full'>
        <NavMessage name={ dataReceiver?.name }/>
        <AreaMessage/>
        <NavSendMessage/>
      </div>
    </div>
  )
}

export default FieldChat