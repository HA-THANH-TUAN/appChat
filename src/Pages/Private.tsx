import  React , {useContext,useEffect,useRef, useState} from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import MyContext from '../app/context/context';
import { useQuery, useQueryClient } from 'react-query';
import ChatApi from '../apis/chatApi';
import PopUpRequestCall from '../Layouts/PopUpRequestCall/PopUpRequestCall';
import { useAppDispatch, useAppSelector } from '../app/hooks/useCustomReduxTookit';
import { tooglePopUpNotifyReceiveCall } from '../features/call/callSlice';
import { setTriggerEndScroll } from '../features/chat/chatSlice';
import { selectorUser } from '../features/auth/authSlice';
import { increaseNotifyNumberMessage, selectIsRouteMessage } from '../features/notify/notifySlice';

export type PrivateRouteProps = {
  isAuthenticated :boolean,
  redirectPath?:string,
  outlet:JSX.Element
}

export interface IRequestCall{
  peerId:string, roomId:string,socketCaller:string

}

const PrivateRoute = ({ isAuthenticated , redirectPath="/account/sign-in", outlet}:PrivateRouteProps) => {

  const [conversationId, setConversationId]=useState<string>("")

  const dispatch = useAppDispatch()
  
  const isRouteMessage = useAppSelector(selectIsRouteMessage)

  const userInfor= useAppSelector(selectorUser)

  const [dataRequestCall, setDataRequestCall] = useState<IRequestCall>() 

  const ctx = useContext(MyContext)
  const  createConnectionIO =()=>  {
    const access_token= Cookies.get("refresh_token")
    if (access_token!==undefined) {
      if(ctx?.socketIO){
        ctx.socketIO.auth={access_token}
        ctx.socketIO.connect();
      }
    }
  } 
 
  // const refAudio = useRef()

  const queryClient = useQueryClient()

  const ref =useRef( ()=>{
    const audio =new Audio()
        audio.src=process.env.PUBLIC_URL + '/audio/MessengerBell.mp3';
        audio.preload="auto"
        audio.play()
  } )

  const queryConversationMessage =  useQuery({
    queryKey: conversationId ==="" ? ["conversationMessageNot"] :  ["conversationMessage", conversationId],
    queryFn : Boolean(conversationId) ? ()=>ChatApi.getConversationMessage(conversationId) :undefined,
    enabled: Boolean(conversationId),
  })
    
  useEffect(() => {
    if(isAuthenticated){
      createConnectionIO()
      ctx?.socketIO.on("connected", ()=>{
        console.log("IO connected")
      })
     
  
      ctx?.socketIO.on("responseSendMessage", (data)=>{
        const dataQueryMessage:any = queryClient.getQueryData([`conversationMessage`, data.conversationId])  ?? [] 
        queryClient.setQueryData([`conversationMessage`, data.conversationId], (presentData:any)=>{
          if(presentData==undefined){
            setConversationId(data.conversationId)
          }
          else{
            if(presentData.metadata){
              dispatch(setTriggerEndScroll())
              return {...presentData,metadata : [...presentData.metadata, data]}
            }
          }
        }) 
        
        // setA((state)=>(!state));
        // queryClient.setQueryData([`conversationMessage`,data.conversationId], {...dataQueryMessage, metadata: [...dataQueryMessage?.metadata , data]})
      })

      ctx?.socketIO.on("requestCall", (data:IRequestCall)=>{
          console.log("has user call:::", data)
          setDataRequestCall(data)
          dispatch(tooglePopUpNotifyReceiveCall(true))
      } )
    }
  
    return () => {
      ctx?.socketIO.removeAllListeners()
      ctx?.socketIO.disconnect()
    }
  }, [])

  useEffect(()=>{
    ctx?.socketIO.on("message", (data)=>{
  
      console.log("NHẬN TIN NHẮN:::", data);
      const isOwn = data.senderId==userInfor?.id
      if(!isRouteMessage && !isOwn){
        dispatch(increaseNotifyNumberMessage())
        console.log("====> increase")
      }
      if(!isOwn){
        ref.current()
      }
      queryClient.setQueryData([`conversationMessage`, data.conversationId], (presentData:any)=>{
        if(presentData==undefined){
          setConversationId(data.conversationId)
        }
        else{
          if(presentData.metadata){
            dispatch(setTriggerEndScroll())
            return {...presentData,metadata : [...presentData.metadata, data]}
          }
        }
      })
    })
    return ()=>{
      ctx?.socketIO.removeListener("message")
    }
  },[isRouteMessage])
  
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>
    {
      dataRequestCall && <PopUpRequestCall dataRequestCall={dataRequestCall}/>

    }
    {/* <audio muted controls preload='auto' ref={refAudio} >
      <source src={process.env.PUBLIC_URL + '/audio/MessengerBell.mp3'} />
    </audio> */}
    {outlet}
  </> ;
};

export default PrivateRoute;
