import React, {useContext, useEffect, useState,useRef} from 'react'
import PopUpCall from '../Layouts/FieldChat/PopUpCall'
import { createSearchParams, useMatch, useSearchParams } from 'react-router-dom'
import MyContext from '../app/context/context'
import Peer from 'peerjs'
import { uid } from 'uid'

import AreaCall from './AreaCall'
import { useAppDispatch, useAppSelector } from '../app/hooks/useCustomReduxTookit'
import { setIsPageCall } from '../features/call/callSlice'

const CallCScreen = () => {
  const ctx=useContext(MyContext)
  const [peerId] =useState<string>(()=>uid(36))

  const [peer]=useState<Peer>(()=>{
    return new Peer(peerId)
  })

  const gState= useAppSelector((state)=>state)
 
  console.log("gState:::",gState)
  console.log("peer:::",peer)
  
  console.log("ctx  :::",ctx  )
  const [isProcessCall, setIsProcessCall] =useState<boolean>(true)
  
  let [searchParams, setSearchParams] = useSearchParams()
  const numberKey = searchParams.size
  const hasVideo = searchParams.get("hasVideo")
  const roomId = searchParams.get("roomId" )
  const conversationStatus = searchParams.get("conversationStatus")
  const [stream, setStream]=useState<MediaStream>()
  const dispatch = useAppDispatch()

  const refIdTimeOut = useRef<NodeJS.Timer>()

  const timerCall = useRef<number>(0)


  useEffect(()=>{
    dispatch(setIsPageCall(true))
    if(ctx?.peerConnection){
      const createStream =async () => {
        try {
          const constraints: MediaStreamConstraints={
            audio:false,
            video:true,
          }
          const stream =await navigator.mediaDevices.getUserMedia(constraints)
          setStream(stream)
          
        } catch (error) {
          alert("Lỗi stream !!!")
          console.log("error:::",error)
        }
      }
      createStream()
    }

  },[])

  const socketIO = ctx?.socketIO

  useEffect(()=>{
    if(socketIO){
        socketIO.on("acceptCalling",()=>{
          console.log("refIdTimeOut.current",refIdTimeOut.current)
            clearInterval(refIdTimeOut.current)
          })
          
          socketIO.on("rejectCalling", ()=>{
            console.log("cuoc goi tu choi!!!")
            clearInterval(refIdTimeOut.current)
        })

    }
  },[])





  const isTrue = numberKey && hasVideo && roomId
  
  const hasVideoCovert:(boolean | null) = hasVideo==="true" ? true : hasVideo==="false" ? false: null 

  if( hasVideoCovert === null || !isTrue || roomId === null){
    return <div>Lỗi route</div>
  }

  console.log("=====>>" , stream)

  const handleOnStartCalling = ()=>{
    setSearchParams({hasVideo,roomId,conversationStatus:"start"})
    const handleSendSession=()=>{
      if(socketIO){
        if(socketIO.connected===false){
                    console.log("Kết nối lại !!!")
                    socketIO.connect()
                  }
                  
                  socketIO.emit("requestCall", {
                    peerId : peerId,
                    roomId: roomId
                  })
                  
                  
                  
            }
        }

        refIdTimeOut.current = setInterval(()=>{
            if(timerCall.current<9){
              console.log("run Interval::", ctx?.peerConnection)
                handleSendSession();
                timerCall.current++
                return undefined
              }
              clearInterval(refIdTimeOut.current)
              timerCall.current=0
        }, 3000)

        // setIsProcessCall((state)=>(!state))
      }
      

      console.log("render")
      
  return (
    <div>
        {
         <>
            {
              !conversationStatus ? 
              <PopUpCall 
                onStartCalling={handleOnStartCalling}
                stream={stream} 
                isCamera={hasVideoCovert}
              />:
              <>
                { stream!==undefined && <AreaCall myStream={stream}/>}
              </>
            
            }
          </> 
        }
    </div>
  )
}

export default CallCScreen





// import React from 'react'
// import PopUpCall from '../Layouts/FieldChat/PopUpCall'
// import { useMatch, useSearchParams } from 'react-router-dom'

// const CallCScreen = () => {
//   let [searchParams] = useSearchParams()
//   const numberKey = searchParams.size
//   const hasVideo = searchParams.get("hasVideo")
//   const roomId = searchParams.get("roomId" )

//   const isTrue = numberKey && hasVideo && roomId
  
//   const hasVideoCovert:(boolean | null) = hasVideo==="true" ? true : hasVideo==="false" ? false: null 
//   if( hasVideoCovert === null || !isTrue || roomId === null){
//     return <div>Lỗi route</div>
//   }

//   return (
//     <div>
//         <PopUpCall hasVideo={ hasVideoCovert} roomId={roomId}  />
//     </div>
//   )
// }

// export default CallCScreen