import React, {useContext, useEffect, useState,useRef} from 'react'
import PopUpCall from '../Layouts/FieldChat/PopUpCall'
import { useMatch, useSearchParams } from 'react-router-dom'
import MyContext from '../app/context/context'

const CallCScreen = () => {
  const ctx=useContext(MyContext)

  const [isProcessCall, setIsProcessCall] =useState<number>(0)
  
  let [searchParams] = useSearchParams()
  const numberKey = searchParams.size
  const hasVideo = searchParams.get("hasVideo")
  const roomId = searchParams.get("roomId" )
  const [stream, setStream]=useState<MediaStream>()

  const refIdTimeOut = useRef<NodeJS.Timer>()
  const timerCall = useRef<number>(0)

  const [offer,setOffer] = useState<RTCSessionDescriptionInit>()

  useEffect(()=>{
    if(ctx?.peerConnection){
      const createStream =async () => {
        try {
          const constraints: MediaStreamConstraints={
            audio:true,
            video:false,
          }
          const stream =await navigator.mediaDevices.getUserMedia(constraints)
          console.log("stream in UseEffect:::",stream)
          stream.getTracks().forEach((track) => ctx?.peerConnection.addTrack(track, stream));
          const offer = await ctx?.peerConnection.createOffer();
          await ctx?.peerConnection.setLocalDescription(offer)
          setOffer(offer)
          setStream(stream)
          
        } catch (error) {
          alert("Lỗi stream !!!")
        }
      }
      createStream()

      ctx.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("onicecandidateonicecandidate:::", event)
          // Send the candidate to the other party
        }
      }
    }

  },[])



  const isTrue = numberKey && hasVideo && roomId
  
  const hasVideoCovert:(boolean | null) = hasVideo==="true" ? true : hasVideo==="false" ? false: null 

  if( hasVideoCovert === null || !isTrue || roomId === null){
    return <div>Lỗi route</div>
  }

  console.log("=====>>" , stream)

  const handleOnStartCalling = ()=>{
      console.log("offer", offer)
      console.log("stream", stream)

      const handleSendSession=()=>{
            const socketIO = ctx?.socketIO
            if(socketIO && offer){
                if(socketIO.connected===false){
                    console.log("Kết nối lại !!!")
                    socketIO.connect()
                }else{
                    console.log("Kết nối luôn offer::: !!!",offer)
                    socketIO.emit("requestCall", {
                        roomId:roomId,
                        sessionRTC: offer
                    })
                }
    
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
        }, 3000)

  }


  return (
    <div>
        {
         <>
            {
              isProcessCall === 0 ? 
              <PopUpCall 
                onStartCalling={handleOnStartCalling}
                stream={stream} 
                isCamera={hasVideoCovert}
              />
              
              :""
            
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