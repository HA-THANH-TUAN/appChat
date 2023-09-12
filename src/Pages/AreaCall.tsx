import React ,{useRef,useEffect,FC, useState} from 'react'
import { BsCameraVideoFill, BsCameraVideoOff, BsCameraVideoOffFill, BsFillCaretRightFill } from 'react-icons/bs'
import { MdCallEnd } from 'react-icons/md'
import { PiMicrophoneFill, PiMicrophoneSlashFill } from 'react-icons/pi'
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'
import {RiSkipLeftLine, RiSkipRightLine} from "react-icons/ri"
import classNames from 'classnames'

interface IAreaCall {
  myStream: MediaStream
}

const AreaCall:FC<IAreaCall> = ({myStream}) => {
  const refMyVideo = useRef<HTMLVideoElement>(null)
  const [isToogleVideo, setIsToogleVideo] = useState<boolean>(true)
  useEffect(() => {
    const tagMyVideo = refMyVideo.current
    if(tagMyVideo){
      tagMyVideo.srcObject= myStream

    }
  }, [isToogleVideo])

  const handleOnClickCloseVideo = ()=>{
    setIsToogleVideo((state)=>(!state))

  }
  
  return (
    <div className='w-screen h-screen bg-black fixed z-[2000] right-0 bottom-0'>
      <section className='flex w-full h-full justify-center items-center text-white relative'>
        <div className='flex items-center flex-col '>
          <span className='inline-block w-24 h-24 rounded-[50%] bg-zinc-500'></span>
          <h4 className='mt-7 font-semibold text-xl'>HA THANH TUAN</h4>
          <span className='inline-block mt-2'> Dang goi . . .</span>
        </div>
        <div className='flex absolute bottom-0 pb-10  '>
          <button className="w-12 h-12 mx-3 rounded-[50%] bg-[#363636] text-2xl flex justify-center items-center"><BsCameraVideoFill/></button>
          <button className="w-12 h-12 mx-3 rounded-[50%] bg-[#363636] text-2xl flex justify-center items-center"><PiMicrophoneFill/></button>
          <button className="w-12 h-12 mx-3 rounded-[50%] bg-red-600 text-2xl flex justify-center items-center"><MdCallEnd/></button>

        </div>
        <div className='flex absolute h-[190px] right-10 bottom-10 items-center'>
          <button onClick={handleOnClickCloseVideo} className={classNames('absolute left-1 py-6 rounded-sm cursor-pointer z-50 ',{
            "bg-[#56565653] hover:bg-[#565656a1]": !isToogleVideo,
            "bg-[#000000b6] hover:bg-[#000000d6]": isToogleVideo
          })}
          >{isToogleVideo ? <RiSkipRightLine/> :<RiSkipLeftLine/> }</button>
          {isToogleVideo &&<video className='rounded-lg h-full'ref={refMyVideo} autoPlay></video>}
        </div>
      </section>

    </div>
  )
}

export default AreaCall