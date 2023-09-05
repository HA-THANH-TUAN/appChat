import React, { useState ,useEffect} from 'react'
import ListChat from '../Layouts/SiderBarMessage/ListChat/ListChat'
import { Outlet, useMatch, useParams } from 'react-router-dom'
import SearchConversation from '../Components/SearchConversation'
import SiderBarMessage from '../Layouts/SiderBarMessage/SiderBarMessage'
import { useQueryClient } from 'react-query'




export const Message = () => {
  const {type, conversationId} =useParams<string>()
  const listType=["inbox", "requests"]
  const [isPopUpSearch,setIsPopUpSearch]=useState<boolean>(false)

  const [typeState, setTypeState] =useState<string>(()=>{
    return type === undefined ? "inbox" : type
  })

  const checRouteNotExist  = type ===undefined || !listType.includes(type) || (type=="requests" && conversationId!==undefined && conversationId?.length > 0 )

  const queryClient= useQueryClient()
  // const dataConversation = queryClient.fetchQuery()
  // const dataConversation = queryClient.getQueryState(["conversations"])
  // console.log("dataConversationdataConversation::::",dataConversation)

  // console.log("Message component:::render",dataConversation)


  if(checRouteNotExist){
    return <div>Route khong dung</div>
  }

  return (
    <div className='flex-1 flex '>
      <SiderBarMessage type={typeState} handleSetTypeState= {setTypeState} handleSetIsPopUp={setIsPopUpSearch} />
      <Outlet context={{handleSetIsPopUp: setIsPopUpSearch}} />
      {isPopUpSearch && <SearchConversation handleSetIsPopUp={setIsPopUpSearch}/> }

      {/* <ListChat handleSetIsPopUp={setIsPopUpSearch} /> */}
      
    </div>
  )
}
