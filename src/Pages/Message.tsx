import React, { useState ,useEffect} from 'react'
import ListChat from '../Layouts/ListChat/ListChat'
import { Outlet, useParams } from 'react-router-dom'
import SearchConversation from '../Components/SearchConversation'




export const Message = () => {
  const {userId}=useParams<string>()
  useEffect(() => {
    console.log("message=>>>", userId)
    
  }, [userId])
  const [isPopUpSearch,setIsPopUpSearch]=useState<boolean>(false)
  return (
    <div className='flex-1 flex '>
      <ListChat handleSetIsPopUp={setIsPopUpSearch} />
      <Outlet context={{handleSetIsPopUp: setIsPopUpSearch}} /> 
      {isPopUpSearch && <SearchConversation handleSetIsPopUp={setIsPopUpSearch}/> }
      
    </div>
  )
}
