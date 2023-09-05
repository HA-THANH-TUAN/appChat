import React, { useEffect,useRef,useState,useContext } from 'react'
import BoxMessage from '../../Components/BoxMessage'
import { useQuery, useQueryClient } from 'react-query'
import ChatApi from '../../apis/chatApi'
import { useParams } from 'react-router-dom'
import MyContext from '../../app/context/context'
import { useAppSelector } from '../../app/hooks/useCustomReduxTookit'
import { selectorUser } from '../../features/auth/authSlice'
import { selectTriggerEndScroll } from '../../features/chat/chatSlice'
import Loading from '../../Components/Loading'


interface IAreaMessage{
  

}

const AreaMessage:React.FC<IAreaMessage>= () => {
  const mySelf = useAppSelector(selectorUser)
  const changeScrollEnd = useAppSelector(selectTriggerEndScroll)
  const {conversationId} = useParams<string>()
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [changeScrollEnd]);
  
  const queryMessage  = useQuery({
    queryKey:["conversationMessage", conversationId],
    queryFn : conversationId ? ()=>ChatApi.getConversationMessage(conversationId) : undefined,
    enabled : conversationId !==undefined
  })


  console.log("queryMessage.status===loading", queryMessage)

  
  return (
        <section ref={scrollableRef} className='flex-1 h-full overflow-x-hidden'>
          <div>
            {queryMessage.status==="loading" ? 
            <Loading/>
            :queryMessage.data?.metadata?.map(
              (message:any)=>{
                return <BoxMessage key={message._id} content={message.message?.content} isMyMessage={message.senderId == mySelf?.id}/>
              }
            )}
          </div>
        </section>
  )
}

export default AreaMessage