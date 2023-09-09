import React, {useContext,useEffect,useState,useRef} from 'react'

import MyContext from '../app/context/context'

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
        const a= await ctx?.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        const answer  = await ctx?.peerConnection.createAnswer()
        await ctx?.peerConnection.setRemoteDescription(offer)

        
 
      }
      handleRemote()
    }

  

    useEffect(() => {
      
      if(ctx?.peerConnection){
        ctx.peerConnection.ontrack=(e)=>{
          console.log("e=====>Home MyStream",e.streams[0])
          if(refVideo.current){

            refVideo.current.srcObject=e.streams[0]
          }
        }

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
