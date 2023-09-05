import  React , {useContext,useEffect,useRef, useState} from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import MyContext from '../app/context/context';
import { useQuery, useQueryClient } from 'react-query';
import ChatApi from '../apis/chatApi';
import AudioBellMessage from '../Components/AudioBellMessage';

export type PrivateRouteProps = {
  isAuthenticated :boolean,
  redirectPath?:string,
  outlet:JSX.Element
}


// created()

const PrivateRoute = ({ isAuthenticated , redirectPath="/account/sign-in", outlet}:PrivateRouteProps) => {
 
  const refAudio = useRef<HTMLAudioElement>(null)

  const [conversationId, setConversationId]=useState<string>("")

  const ctx = useContext(MyContext)
  const  createConnectionIO =()=>  {
    const access_token= Cookies.get("access_token")
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
        audio.load()
        audio.play()
  } )

  const queryConversationMessage =  useQuery({
    queryKey: conversationId ==="" ? ["conversationMessageNot"] :  ["conversationMessage", conversationId],
    queryFn : Boolean(conversationId) ? ()=>ChatApi.getConversationMessage(conversationId) :undefined,
    enabled: Boolean(conversationId),
  })
  
  // console.log("queryConversationMessage:::", queryConversationMessage)
  
  useEffect(() => {
    if(isAuthenticated){
      createConnectionIO()
      ctx?.socketIO.on("message", (data)=>{
        console.log("NHẬN TIN NHẮN:::", data);

        // const dataQueryMessage:any = queryClient.getQueryData([`conversationMessage`, data.conversationId]) ?? []
        // console.log("dataQueryMessage:::",dataQueryMessage)

       

        queryClient.setQueryData([`conversationMessage`, data.conversationId], (presentData:any)=>{

          console.log("presentData ===>", presentData)

          if(presentData==undefined){
            setConversationId(data.conversationId)
          }
          else{
            if(presentData.metadata){
              console.log("===>zo dc set")
              return {...presentData,metadata : [...presentData.metadata, data]}
            }
          }
        })
        // if(scrollableRef.current !==null){
        //   setA((state)=>(!state));
        // }

        ref.current()
        
        // if(refAudio?.current !==null){
        //   refAudio.current.play()

        // }
        // ctx.eBellMessage.play()
      })
  
      ctx?.socketIO.on("responseSendMessage", (data)=>{
        const dataQueryMessage:any = queryClient.getQueryData([`conversationMessage`, data.conversationId])  ?? []  
        // setA((state)=>(!state));
        // queryClient.setQueryData([`conversationMessage`,data.conversationId], {...dataQueryMessage, metadata: [...dataQueryMessage?.metadata , data]})
      })

    }
  
    return () => {
      ctx?.socketIO.removeAllListeners()
      ctx?.socketIO.disconnect()
    }
  }, [])
  

  console.log("private route::",isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>
    {outlet}
  </> ;
};

export default PrivateRoute;
