import React, {useContext,useEffect,useState,useRef} from 'react'

import MyContext from '../app/context/context'
import Peer from 'peerjs'
import { uid } from 'uid'



export const Test = () => {
    const ctx =useContext(MyContext)
    //  useEffect(() => {
    //   ctx?.peerConnection.setRemoteDescription(new RTCSessionDescription())
       
    //  }, [])
    const refVideo = useRef<HTMLVideoElement>(null)
    const [value, setValue] = useState<any>("")
    const handleOnClick = ()=>{
      const offer  = JSON.parse(value)

      const handleRemote = async()=>{
     
      }
      handleRemote()
    }

  

    useEffect(() => {
      const peer =ctx?.peerConnection
      const tagVideo =refVideo.current
  
      if(peer){
        peer.on("call", (stream)=>{
          console.log("+++>>>>> ",stream)
          if(tagVideo !==null){
            console.log("=====test====",stream)
          }

        })

      }
    }, [])
    

  return (
    <div>
        <input onChange={(e)=>{setValue(e.target.value)}} value={value}/>
        <button onClick={handleOnClick} >oke</button>
        <video controls autoPlay ref={refVideo}></video>
    </div>
  )
}
