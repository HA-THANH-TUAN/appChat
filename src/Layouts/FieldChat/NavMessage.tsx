import React from 'react'
import { BsCameraVideo } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'
import { PiWarningCircle } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'

interface INavMessage {
  name?:string,
  statusUser:boolean
}

const NavMessage:React.FC<INavMessage> = ({name}) => {

  const nav=useNavigate()
  return (
      <section>
        <div className='h-[80px] px-3 border-b flex items-center'>
          <div className='flex items-center flex-1'>
              <div className='flex flex-1 items-center' >
                  <div className='w-11 h-11 bg-slate-600 rounded-[50%]'></div>
                  <div className='ml-2'>
                      <h2 className='font-bold'>{name}</h2>
                      <p className='text-xs'>Hoạt động 2 giờ trước </p>
                  </div>
              </div>
              <div className='pl-3'>
                  <ul className='flex'>
                    <li className='mx-2 text-2xl flex justify-center items-center hover:opacity-70 cursor-pointer' 
                      onClick={()=>{
                        nav("/call")
                      }}
                    ><FiPhoneCall/></li>
                    <li className='mx-2 text-3xl flex justify-center items-center hover:opacity-70 cursor-pointer' 
                      onClick={()=>{
                        nav(`/call?video=false&receiverId=rtyfftftdcgyt`) 
                      }}
                    ><BsCameraVideo/></li>
                    <li className='mx-2 text-3xl flex justify-center items-center hover:opacity-70 cursor-pointer'><PiWarningCircle/></li>
                  </ul>
              </div>
          </div>
        </div>
        <div></div>
      </section>
  )
}

export default NavMessage