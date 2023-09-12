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
import classNames from 'classnames'


interface IAreaMessage{
  

}

const AreaMessage:React.FC<IAreaMessage>= () => {
  const mySelf = useAppSelector(selectorUser)
  const changeScrollEnd = useAppSelector(selectTriggerEndScroll)
  const {conversationId} = useParams<string>()
  const [isScrollFirst, setIsScrollFirst]= useState<boolean>(true)
  const scrollableRef = useRef<HTMLDivElement>(null);
  
  const queryMessage  = useQuery({
    queryKey:["conversationMessage", conversationId],
    queryFn : conversationId ? ()=>ChatApi.getConversationMessage(conversationId) : undefined,
    enabled : conversationId !==undefined
  })

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
      setIsScrollFirst(false)
    }
  }, [changeScrollEnd,queryMessage.status,conversationId]);
  
 
  // function isElementAtTop(element: HTMLDivElement) {
  //   const elementRect = element.getBoundingClientRect();
  //   return elementRect;
  //   return elementRect.top <= 80;
  // }

  // useEffect(()=>{
  //   const element =scrollableRef.current
  //   if(element !==null){
  //     element.onscroll=()=>{
  //       const scrollTop = element.scrollTop;
  //       if(scrollTop===0 && !isScrollFirst){
  //         console.log("====>", "top")
  //       }
  
  //     }

  //   }
  // },[])
  // console.log("queryMessage.status===loading", queryMessage)

  const isLoading= queryMessage.status==="loading"
  return (
        <section ref={scrollableRef} className={classNames('flex-1 h-full overflow-x-hidden ',
          {
            "flex items-center justify-center bg-[#ececec1a]" :isLoading  
          }
        )}>
          <div>
            { isLoading? 
            <Loading bg='#ececec1a' />
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