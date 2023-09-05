import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

const AudioBellMessage = (props: any) => {
    const refAudio = useRef<HTMLAudioElement>(null)
    useEffect(()=>{
        // refAudio.current?.play()
    },[props.change])



  useEffect(() => {

  }, []);
    return (
      <audio ref={refAudio} autoPlay controls>
      <source  src={process.env.PUBLIC_URL + '/audio/FacebookMessengerCall.mp3'} type="audio/mpeg" />
      
    </audio>
  )
}

export default AudioBellMessage