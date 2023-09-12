import React, { useState , useContext } from 'react'

import NavMessage from './NavMessage'
import AreaMessage from './AreaMessage'
import NavSendMessage from './NavSendMessage'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import ChatApi from '../../apis/chatApi'
import MyContext from '../../app/context/context'
import { useAppSelector } from '../../app/hooks/useCustomReduxTookit'
import { selectorUser } from '../../features/auth/authSlice'

const FieldChat = () => {
  const ctx = useContext(MyContext)
  const [message, setMessage] = useState<string>("")
  const {conversationId}=useParams<string>()

  const [receiver, setReceiver] = useState<any>(undefined)
  const mySelf= useAppSelector(selectorUser)

  const queryMessages= useQuery({
    queryKey:["conversations"],
    queryFn: ChatApi.getConversation,
    onSuccess(data) {
      if(data.metadata !==null){
        const  filterConversation  = data.metadata?.find((conversation)=>conversation._id === conversationId)

        if(filterConversation !==undefined){
            if(filterConversation.type==="personal"){
              const getReceiver=filterConversation.members.filter(member=>member.user._id !== mySelf?.id )
              if(getReceiver.length !==0){
                setReceiver(getReceiver[0])
                return undefined
              }
            }else if(filterConversation.type==="group"){

            }
        }
      }
    },
  })  
  const handleSendMessage = ()=>{
    if(mySelf !==undefined){
      if(conversationId !==undefined){
        ctx?.socketIO.emit("message" ,{
          roomId: conversationId,
          user:{
            id:mySelf.id,
            name:mySelf.name
          },
          message: message
        })
      }
      return undefined
    }
      alert("yet upload data Myself in redux !")
  }

  return (
    <div className='flex-1 w-full'>
      <div className='flex flex-col h-screen'>
        {
          queryMessages.status ==="loading" ? <>--------------------Loading-------------------------</>:
          <>
            <NavMessage name={receiver?.user.name} statusUser={true}/>
            <AreaMessage/>
            <NavSendMessage message={message} handleSetMessage = {setMessage}  handleSendMessage={handleSendMessage}/>
          </>

        }
      </div>
    </div>
  )
}

export default FieldChat