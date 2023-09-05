import React,{useState} from 'react'
import ChatApi from '../../apis/chatApi'
import { useQuery, useQueryClient } from 'react-query'
import ListChat from './ListChat/ListChat'
import ListChatPending from './ListChatPending/ListChatPending'
import { IConversation } from '../../models/Types/chat.response.type'

interface ISideBarMessagse{
  handleSetIsPopUp:React.Dispatch<React.SetStateAction<boolean>> 
  type:string,
  handleSetTypeState :React.Dispatch<React.SetStateAction<string>> 
}

const SiderBarMessage: React.FC<ISideBarMessagse>=({handleSetIsPopUp,type,handleSetTypeState}) =>{
  const [isListChat, setIsListChat]=useState<boolean>(true)

  const {data, status} = useQuery({
    queryKey:["conversations"],
    queryFn: ChatApi.getConversation
  })

  let dataAccepted:IConversation[] | []=[]
  let dataPending: IConversation[] | [] =[]

  if(status==="success" && data.metadata !==null && data.metadata?.length !==0){
    dataAccepted = data.metadata?.filter((conversation)=>conversation.statusConversation==="accepted")??[]
    dataPending = data.metadata?.filter((conversation)=>conversation.statusConversation==="pending")??[]
  }

  if(type==="inbox"){
    return <ListChat 
              handleSetTypeState={handleSetTypeState}
              handleSetIsPopUp={handleSetIsPopUp}
              status={status}
              data={dataAccepted}
              />
              
  }
  return (
      <ListChatPending
        handleSetTypeState={handleSetTypeState}
        data={dataPending}
        status={status}
        handleReturnListChat={setIsListChat}
      />
  )
}

export default SiderBarMessage