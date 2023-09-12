import React, { useEffect, useRef, useState } from 'react'
import Peer, { DataConnection, MediaConnection } from 'peerjs'
import { uid } from 'uid'

const LiveStream = () => {
  const [peerObject, setPeerObject]=useState<Peer>()
  const [myId, setMyId]= useState<string>("")

  const [isYouCall, setIsYouCall]=useState<boolean>(false)

  const [idFormInput, setIdFormInput]= useState<string>("")

  const [streamVideo, setLiveStreamVideo] =useState<MediaStream>()

  const [call, setCall] =useState<MediaConnection>()
  
  const [videoOfCaller, setVideoOfCaller] =useState<MediaStream>()
  
  const videoOfCallerTag = useRef<HTMLVideoElement>(null)

  const videoLocalStream = useRef<HTMLVideoElement>(null)
  
  useEffect(()=>{
    const openStream = ()=>{
      const cofig = {
        audio :false, video:true
      }

      return navigator.mediaDevices?.getUserMedia(cofig)
    }

    
    const runOpenStream = async ()=>{
      const video =await openStream()
      if(video){
        const {current:videoTag}= videoLocalStream
        if( videoTag!==null){
          videoTag.srcObject= video
        }
        setLiveStreamVideo(video)
        const a_random_id = uid(36)
        
        const peer = new Peer(a_random_id, {key: 'myapikey'}); 

         peer.on("open",(id)=>{console.log("Id Bạn Tạo Ra :::==>", id); setMyId(id)})
         
    
         peer.on('connection', function(connect) { 
          console.log("Co nguoi ket noi >>>>>UseEffect:::", connect)
         });

         peer.on('call', function(call) {
           // Answer the call, providing our mediaStream
              console.log("có người gọi bạn đó, bạn muốn nghe không vậy  ???", call)
              call.on('stream', function(stream) {
                setVideoOfCaller(stream)
                const {current:videoTag}= videoOfCallerTag
                if( videoTag!==null){
                  videoTag.srcObject= stream
                  console.log("on call peer:::",peer)
                }
              });

              setCall(call)
          });



          // peer.sign

          peer.on("close",()=>{
            console.log("Bạn của bạn đã close :::")
          })
          peer.on("error",(error)=>{
            console.log("Peer lỗi nè mấy bạn:::", error)
          })
          peer.on("disconnected", ()=>{
            console.log("Peer -> disconnected")
          })
    
         setPeerObject(peer)
      }
    }
    runOpenStream()
    return ()=>{
      peerObject?.disconnect()

    }
  },[])


  const handleCall=()=>{
    callPeer(isYouCall, idFormInput)
   

  }

  const callPeer=(isYouCall:boolean ,id:string):void=>{
    if(peerObject){
      if(streamVideo){
        if(isYouCall){
          console.log("Bạn Muốn Call :::", idFormInput)
        }
        console.log("Ket nối với bạn của bạn :::", idFormInput)
        const call= peerObject.call(idFormInput, streamVideo);
        call.on("stream",(stream)=>{
          if(videoOfCallerTag.current !==null){
            videoOfCallerTag.current.srcObject=stream
            console.log("==========>>>>> ", stream)
            console.log("==========>>>>>peerObject  ", peerObject)

          }

        })
      }
    }
  }

  const handleOnchage:React.ChangeEventHandler<HTMLInputElement> =(e)=>{
    setIdFormInput(e.target.value)
  }
  const handleEnd=()=>{
    peerObject?.disconnect?.();
    console.log("Tắt máy !!!")
  }
  const handleOke=()=>{
    console.log("Bắt máy !!!")
    // setIsYouCall(true)
    // if(call){
    //   callPeer(false, call?.peer)
    // }
    call?.answer(streamVideo);
  }
 
  const handleNo=()=>{
    console.log("Từ chối bắt máy !!!")
    call?.close()
  }
 
  console.log("Component Render !!!")
  return (
    <div className='flex items-center'>
      <div className=''>
        <section>
          <h1 className='font-bold text-lg'>Tôi::: {myId}</h1>
          <video className='w-[320px] h-[180px]' ref={videoLocalStream} autoPlay controls></video>
        </section>

        <section>
          <h1 className='font-bold text-lg'>Bạn tôi:::</h1>
          <video className='w-full h-screen' ref={videoOfCallerTag} autoPlay controls></video>
        </section>
      </div>
        
      <div className='flex items-center flex-col'>
        <div className='bg-lime-300 border-2 border-orange-500'>
          <input className='focus:outline-none px-2 py-3  ' type="text"  onChange={handleOnchage} />
        </div>
          <button type='button'  className='bg-blue-500 text-white rounded px-4 py-2 my-2 flex flex-col' onClick={handleCall}>Call</button>
          <button type='button'  className='bg-blue-500 text-white rounded px-4 py-2 my-2 flex flex-col' onClick={handleOke}>Ok</button>
          <button type='button'  className='bg-blue-500 text-white rounded px-4 py-2 my-2 flex flex-col' onClick={handleNo}>No</button>
          <button type='button'  className='bg-blue-500 text-white rounded px-4 py-2 my-2 flex flex-col' onClick={handleEnd}>End</button>
      </div>
    </div>

  )
}

export default LiveStream